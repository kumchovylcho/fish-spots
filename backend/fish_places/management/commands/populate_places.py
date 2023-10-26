from django.core.management.base import BaseCommand
from fish_places.models import Place

class Command(BaseCommand):
    help = 'Populating the DB with fish places'

    def handle(self, *args, **kwargs):
        places_info = {
            "tyulenovo": {
                "description": "На това специфично място можете да практикувате риболов на зарган, а в околията и ако терена позволява също така сафрид и чернокоп.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166700329262387292/tyulenovo.jpg?ex=654b715a&is=6538fc5a&hm=9c19765acc9ef131014325a654ecfa9e9652f45119899a9f2030f603a90038dc&",
                "longitude": "43.5159807",
                "latitude": "28.5986176",
                "region": "north"
            },
            "kranevo": {
                "description": "Изберете си една от четирите буни и може да започнете да търсите сафрид и зарган. Имайте предвид ,че някои от буните са леко потънали и достъпа може да бъде невъзможен.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699440237719602/kranevo.jpg?ex=654b7086&is=6538fb86&hm=9695cebe2cb945da9733bb804dcf35cb0e12c318d897a8fb3de8fe4d4499291b&",
                "longitude": "43.3230436",
                "latitude": "28.0664616",
                "region": "north"
            },
            "panorama": {
                "description": "На това място можете да практикувате риболов на зарган, сафрид и чернокоп.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699883177193472/panorama.jpg?ex=654b70f0&is=6538fbf0&hm=be2d482daec300ffe7664623a776c4237481a355af2eff8069c774f89ed2a2b7&",
                "longitude": "43.3017312",
                "latitude": "28.0535553",
                "region": "north"
            },
            "noi": {
                "description": "Тук можете да практикувате риболов на зарган, сафрид и чернокоп. Също така от вътрешната страна на буната можете да пробвате и за илария на дъно.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699685667426344/noi.jpg?ex=654b70c1&is=6538fbc1&hm=78347db8f729c29d4626ebef70a0037e39d684451cf018f5ea534211b7ad717e&",
                "longitude": "43.2485368",
                "latitude": "28.0304259",
                "region": "north"
            },
            "slanchev-den": {
                "description": "На тази буна в близост до Ной, можете да хващате сафрид и зарган. Застава се на левия рог, понеже там е по-дълбоко. Зимата можете да пробвате за зарган във вътрешността на буната.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166700153181323335/slanchev-den.jpg?ex=654b7130&is=6538fc30&hm=0a8eeb094fea87f008b1644ed49939bfd24c561d030d59bde1c39ad988e7e499&",
                "longitude": "43.2446327",
                "latitude": "28.0251074",
                "region": "north"
            },
            "panelite": {
                "description": "Тази буна е доста известна с риболова на зарган също така и чернокоп когато му е сезона. Лятото е трудно да намерите място за паркиране и също така е добре да си носите гумени ботуши, понеже буната е ниска и залива.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699785345048626/panelite.jpg?ex=654b70d9&is=6538fbd9&hm=a7f5d624569648e5875e33035e4c333fab16f5d846b1effbe2f1e2dd32f3727c&",
                "longitude": "43.2254081",
                "latitude": "28.0145879",
                "region": "north"
            },
            "trakata": {
                "description": "На десния ъгъл на тази буна можете да практикувате риболов на зарган и сафрид.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166700245598601296/trakata.jpg?ex=654b7146&is=6538fc46&hm=dd27aa1b439eb96001acdc893a671174b52f1855ccbc17badce357a966a3a9a9&",
                "longitude": "43.2175716",
                "latitude": "27.9804242",
                "region": "north"
            },
            "buna-1": {
                "description": "На първа буна на десния рог може да търсите зарган.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699116278059079/buna-1.jpg?ex=654b7039&is=6538fb39&hm=9b56a3e2246494cffb3706ad18bb39f7dafae253045fbf44428a19b90b041619&",
                "longitude": "43.204669",
                "latitude": "27.9335551",
                "region": "north"
            },
            "buna-4": {
                "description": "Тук можете да пробвате за зарган и за илария на дъно.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699243080253460/buna-4.jpg?ex=654b7057&is=6538fb57&hm=7d0b3a6768d7a565c2e99d94aedd1ca11be80b0fdedee8f869dc4f58a6d82e93&",
                "longitude": "43.211459",
                "latitude": "27.9572982",
                "region": "north"
            },
            "valnolom": {
                "description": "На това място можете да хващате почти всичко. Доста често се търси сафрид, зарган и чернокоп. Много добро място за риболов на кая. Възможно е в бъдеще да се сложат тетраподи и риболова да бъде невъзможен.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166700447554351125/valnolom.jpg?ex=654b7176&is=6538fc76&hm=64660c2a38a3462f4dbf19fb5fd620bda2db542c264b3b611db2060c2a6c313e&",
                "longitude": "43.1884918",
                "latitude": "27.921919",
                "region": "north"
            },
            "morska-gara-varna": {
                "description": "На морска гара Варна можете да хващате сафрид, карагьоз, хамсия и др. Мястото е удобно, но ако имате кола си пригответе парички за синя зона/паркинг.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166699541815365782/morska-gara-varna.jpg?ex=654b709e&is=6538fb9e&hm=4efcf558f1e595c5cfe000f394423c0929d1117ba671299504760f555f675e42&",
                "longitude": "43.1937287",
                "latitude": "27.9203311",
                "region": "north"
            },
            "pod-mosta": {
                "description": "Под моста е доста тясно място и трябва да внимавате да не се закачите с рибарите от другия бряг. Можете да хванете чернокоп, сафрид, хамсия и най-вече карагьоз. Носете си тежки олова и внимавайте за преминаващи лодки.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166700045479977011/pod-mosta.jpg?ex=654b7117&is=6538fc17&hm=14abded681a238e1dceee78190aae5b94bb9e52445df45b1360f43b4edfe2676&",
                "longitude": "43.1901971",
                "latitude": "27.8851298",
                "region": "north"
            },
            "jelezniq-most": {
                "description": "Легендарният железен мост. На това място можете да хванете сафрид, хамсия и карагьоз. Внимавайте за преминаващи лодки.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1167020817771667496/jelezniq-most.webp?ex=654c9bd5&is=653a26d5&hm=90b23d666891dcca9c53ef0dbe4e34ab934c8bf51361bc2b2ce34e46e48c35a3&",
                "longitude": "43.195383",
                "latitude": "27.8953597",
                "region": "north"
            },
            "asparuhovo-buna": {
                "description": "На тази буна можете да хванете зарган, илария и чернокопи ако е сезон.",
                "image_url": "https://cdn.discordapp.com/attachments/1156335620919152650/1166698842058653746/asparuhovo-bunata.jpg?ex=654b6ff8&is=6538faf8&hm=c4dbed9fa2eaaa3950c97eea7b138968b1c2630b182cc0333b248287bbb05268&",
                "longitude": "43.1816372",
                "latitude": "27.9130221",
                "region": "north"
            }
        }

        for fish_place, data in places_info.items():
            if Place.objects.filter(place=fish_place).exists():
                self.stdout.write(self.style.WARNING(f'{fish_place} place already exists. Skipping...'))
                continue

            Place.objects.create(
                place=fish_place,
                description=data['description'],
                image_url=data['image_url'],
                longitude=data['longitude'],
                latitude=data['latitude'],
                region=data['region']
            )

            self.stdout.write(self.style.SUCCESS(f'Successfully added {fish_place} place to the table'))





