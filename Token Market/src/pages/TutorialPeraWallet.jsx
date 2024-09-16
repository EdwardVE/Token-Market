import configPera1 from '../assets/img/config_pera_1.jpeg';
import configPera2 from '../assets/img/config_pera_2.jpeg';
import configPera3 from '../assets/img/config_pera_3.jpeg';
import './TutorialPeraWallet.css';

const TutorialPeraWallet = () => {
    return (
        <div className='tutorial-container'>
            <h1>Configuración de Pera Wallet en TestNet</h1>
            <p>
                Sigue los siguientes pasos para configurar tu Pera Wallet en la red de pruebas <strong>TestNet</strong>:
            </p>
            <ol>
                <li>Descarga la aplicación Pera Wallet desde tu tienda de aplicaciones.</li>
                <li>Abre la aplicación y crea una nueva billetera o importa una existente.</li>
                <li>Ve a la sección de <strong>"Settings"</strong> en la aplicación y selecciona la opción <strong>"Developer Settings"</strong>.</li>
                <img src={configPera1} alt="config_pera_1" />
                <li>Ve a la sección de "Node Settings".</li>
                <img src={configPera2} alt="config_pera_2" />
                <li>En la sección de <strong>"Node Settings"</strong> selecciona la opción <strong>TestNet</strong>.</li>
                <img src={configPera3} alt="config_pera_3" />
                <li>Ahora puedes usar la billetera en TestNet para interactuar con contratos inteligentes y crear tokens.</li>
            </ol>
            <p>Para más información, puedes consultar la <a href="https://developer.algorand.org/docs" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>documentación oficial</a> de Algorand.</p>
        </div>
    );
};

export default TutorialPeraWallet;