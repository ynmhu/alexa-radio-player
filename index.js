const Alexa = require('ask-sdk-core');

// ===== RÁDIÓ STREAM LISTA SZÁMOKKAL =====
const radioStations = {
    '1': { name: 'Szépvíz FM', url: 'https://szepvizfm.ro:8000/stream.mp3' },
    '2': { name: 'Kossuth', url: 'https://icast.connectmedia.hu/4726/mr1ex.mp3' },
    '3': { name: 'Vásárhelyi Rádió', url: 'https://n44a-eu.rcs.revma.com/wevb267khf9uv' },
    'gaga': { name: 'Radio GaGa', url: 'https://a3.my-control-panel.com:6700/radio.mp3' },
    'info': { name: 'Info Radio', url: 'https://stream.infostart.hu:443/lejatszo/stream.mp3' },
    'radio1': { name: 'Radio 1', url: 'https://icast.connectmedia.hu/5202/live.mp3' },
    'petofi': { name: 'Petőfi', url: 'https://icast.connectmedia.hu/4738/mr2.mp3' },
    'radio88': { name: 'Radio 88', url: 'https://stream.radio88.hu/onair.mp3' },
    'klub': { name: 'Klub Radio', url: 'https://stream.klubradio.hu:8443/live.mp3' },
    'radio7': { name: 'Radio 7', url: 'https://stormwind.meatkult.com/test.mp3' },
    'mulatos': { name: 'Mulatos', url: 'https://stream.lazaradio.com/mulatos.mp3' },
    'koko': { name: 'Radio Koko', url: 'https://az10.yesstreaming.net:8210/radiokoko.mp3' },
    'paprika': { name: 'Paprika Radio', url: 'https://stream1.paprikaradio.ro/live.mp3' },
    'retro': { name: 'Retro Radio', url: 'https://icast.connectmedia.hu/5002/live.mp3' }
};

// ===== RÁDIÓ LEJÁTSZÁS =====
const PlayRadioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayRadioIntent';
    },
    handle(handlerInput) {
        const stationSlot = handlerInput.requestEnvelope.request.intent.slots.station;
        const userSaid = stationSlot && stationSlot.value ? stationSlot.value.toLowerCase().trim() : null;
        
        console.log('DEBUG: User said:', userSaid);
        
        // Keresés a kulcs alapján
        if (userSaid && radioStations[userSaid]) {
            const station = radioStations[userSaid];
            return handlerInput.responseBuilder
                .speak(`Playing ${station.name}`)
                .addAudioPlayerPlayDirective('REPLACE_ALL', station.url, `${userSaid}-token`, 0)
                .getResponse();
        }
        
        // Ha nem találja
        return handlerInput.responseBuilder
            .speak('Station not found. Say list all radios.')
            .reprompt('Say play 1, play 2, or list all radios')
            .getResponse();
    }
};

// ===== LISTA MINDEN RÁDIÓRÓL =====
const ListRadioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListRadioIntent';
    },
    handle(handlerInput) {
        const radioList = 'Play 1 for Szépvíz FM. Play 2 for Kossuth. Play 3 for Vásárhelyi Rádió. Or say: play gaga, play info, play radio 1, play petőfi, play radio 88, play klub, play radio 7, play mulatos, play koko, play paprika, or play retro.';
        
        return handlerInput.responseBuilder
            .speak(radioList)
            .reprompt('Say play followed by a number or radio name')
            .getResponse();
    }
};

// ===== LAUNCH REQUEST - RÖVID =====
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Play 1 Szépvíz FM. Play 2 Kossuth. Play 3 Vásárhelyi. Or list all radios.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// ===== AUDIOPLAYER HANDLER-EK =====
const AudioPlayerEventHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.');
    },
    handle(handlerInput) {
        console.log(`AudioPlayer event: ${handlerInput.requestEnvelope.request.type}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

// ===== PAUSE/RESUME HANDLER-EK =====
const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Say play 1, play 2, or play 3')
            .reprompt('Say play followed by a number')
            .getResponse();
    }
};

// ===== ALAP INTENTEK =====
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Say play 1 for Szépvíz FM, play 2 for Kossuth, play 3 for Vásárhelyi, or list all radios.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .speak('Goodbye')
            .getResponse();
    }
};

// ===== SESSION ENDED =====
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

// ===== ERROR HANDLER =====
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        console.log(`Error stack: ${error.stack}`);
        
        return handlerInput.responseBuilder
            .speak('Error. Try again.')
            .reprompt('Say play 1, play 2, or play 3')
            .getResponse();
    }
};

// ===== MAIN EXPORTS =====
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayRadioIntentHandler,
        ListRadioIntentHandler,
        PauseIntentHandler,
        ResumeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        AudioPlayerEventHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('custom/radio-player/v1.0')
    .lambda();
