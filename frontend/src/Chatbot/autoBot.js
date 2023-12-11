import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

const APP_ID = process.env.REACT_APP_APP_ID;

const Autobot = () => {
    Kommunicate.init('16f2badde92dcc243574b09a7376a2e2c', {
        automaticChatOpenOnNavigation: true,
        popupWidget: true
        }
    );
}

export default Autobot;