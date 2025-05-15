from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum
from .models import CatchHistory
from .serializers import CatchHistorySerializer
from base.mixins import AuthorizedMixin
from fish_regions.settings import english_to_bulgarian_months

from datetime import datetime
import calendar


@api_view(["GET"])
def catch_stats(request):
    # e.g: catch_history/?page_size=10&page=1&year=2025&month=5&ordering=-date

    year_param = request.query_params.get("year")
    month_param = request.query_params.get("month")  # 1-12 expected

    now = datetime.now()
    try:
        year = int(year_param) if year_param else now.year
    except ValueError:
        year = now.year

    try:
        month = int(month_param) if month_param else now.month
    except ValueError:
        month = now.month

    yearly_stats = CatchHistory.objects.filter(date__year=year).aggregate(
        total_catch=Sum("quantity"), total_snaps=Sum("snaps")
    )
    yearly_stats["year"] = year

    monthly_qs = CatchHistory.objects.filter(date__year=year, date__month=month)
    monthly_stats = monthly_qs.aggregate(
        total_catch=Sum("quantity"), total_snaps=Sum("snaps")
    )
    monthly_stats["month"] = month
    monthly_stats["month_name_bg"] = english_to_bulgarian_months[
        calendar.month_name[month]
    ]

    paginator = PageNumberPagination()
    page_size_param = request.query_params.get("page_size")
    if page_size_param is None or not page_size_param.isdigit():
        page_size_param = 10

    paginator.page_size = int(page_size_param)
    ordering = request.query_params.get("ordering", "-date")
    paginated_result = paginator.paginate_queryset(
        monthly_qs.order_by(ordering), request
    )
    serialized_data = CatchHistorySerializer(paginated_result, many=True)

    return Response(
        {
            "yearly_stats": yearly_stats,
            "monthly_stats": monthly_stats,
            "results": serialized_data.data,
            "pagination": {
                "current_page": paginator.page.number,
                "total_items": paginator.page.paginator.count,
                "total_pages": paginator.page.paginator.num_pages,
                "page_size": paginator.page_size,
                "has_next": paginator.page.has_next(),
                "has_previous": paginator.page.has_previous(),
                "next_page": (
                    paginator.page.next_page_number()
                    if paginator.page.has_next()
                    else None
                ),
                "previous_page": (
                    paginator.page.previous_page_number()
                    if paginator.page.has_previous()
                    else None
                ),
            },
        }
    )


class CreateCatchHistory(AuthorizedMixin, APIView):
    def post(request):
        serializer = CatchHistorySerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
