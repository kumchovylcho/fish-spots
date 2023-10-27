import '../../index.css';


export default function FishPlaceDetails({ closeModal }) {

    return (
        <article className="fixed top-0 left-0 bottom-0 right-0 bg-black/[.50]">
            <div className="absolute left-2/4 top-2/4 bg-white -translate-x-2/4 -translate-y-2/4 max-w-lg word-break">
                <p>
                    dddddddddddalModalMal ModalModalModadddddddddddddlMlMalMod alModaldalMalModalModalModadddddddddddddlMlMaldalMalModalMo dalModadddddddddddddlMlMaldalMalModalModalMo dadddddddddddddlMlMaldalMalModalModalModaddddd ddddddddlMlMaldalMalModalModalModa dddddddddddddlMlMaldalMalModalModalModadd dddddddddddlMlMaldalMalModalModalModadddddddddddddlMlMalModaddddlMalModalModalModaddddodallddddddddddddllalMalModalModalModadddddddddddddlModallddddddddddddllModaModadalModalModalModalModalModalModalModdddddddddddddddddddddddddddddddddddddddddddddddddddddalModalMalModalModalModadddddddddddddlModallddddddddddddll
                </p>
                <button
                    onClick={() => closeModal()}
                    >
                    Close
                </button>
            </div>
           
        </article>
        
    );
}