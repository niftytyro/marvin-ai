# Marvin

> "I've seen it. It's rubbish." — Marvin, probably.

A voice AI app built with ElevenLabs and React Native. Talk to Marvin, the Paranoid Android from Hitchhiker's Guide to the Galaxy. He's not thrilled about it.


## Roadmap

- [x] Create an agent for Marvin using ElevenLabs.
- [x] Integrate ElevenLabs agent.
- [x] Handle edge cases
  - [x] Prolonged silence
  - [x] Permissions
  - [x] No internet
  - [x] Disruptions
  - [x] App backgrounded - by user, due to phone call, phone locked etc.
- [x] Allow pausing and resuming conversations
- [x] UI Polish
- [x] Sound effect for disruptions
- [x] Avatar
- [x] Handle soft diruptions - e.g. user backgrounds app manually, should not pause the conversation
- [x] voice based orb effects 
- [ ] TODOs / refactor
- [x] Model polish
- [x] Testing
- [x] Testflight/apk

## Known Limitations and Improvements

There are some improvements that can be made to the app:

- Internet connection issue should show a snackbar (also, latency matters more than bandwidth)
- Messaging for why the conversation was paused in case of prolonged silence 
- Marvin itself should be able to handle actions like end chat upon user request
- Context from previous conversations - currently the context is lost when the app is killed
- When resuming convestaion - context can become huge - need to think about how to handle that
- Improved visual feedback when the user/agent speaks
- Improved heuristic for detecting prolonged silence
- When app goes in bg, Marvin should ask the user if they wish to take a pause
- When there is an audio interruption, upon resumption Marvin should mention there was an interruption
- Typewriter UI animation for Marvin's intro
- Initiate the websocket connection in advance without starting the conversation
- Increase speed of the animation after first launch
- Better messaging on pausing conversation, audio interruption detection
- The duration for initial intro needs to come from a constant
- State machine can be used for cleaner state handling - the code has gotten a bit complex
- When app is in background, js code doesn't execute - prolonged silence will not pause the conversation and so on
- Android doesn't pick up the right font - need to investigate and fix that
- Audio focus interruption triggers on app launch
- Handling errors which are currently unhandled 

## Design

The design of the app is simple. It uses ElevenLabs for the AI agent and React Native for the UI. The app is simple. The user opens the app, and the conversation with Marvin begins. The user can pause and resume the conversation, and the app handles edge cases like prolonged silence, permissions, no internet and so on. The conversation can be in one of the following states:

- UNINITIALIZED 
- CONNECTED
- CONNECTING
- RECONNECTING 
- PAUSING 
- PAUSED 
- ENDING
- ENDED 
- DISRUPTED 

There are 2 kinds of interruptions: soft interruptions and hard interruptions. Soft interruptions are when the conversation can continue normally, while hard interruptions are when the conversation cannot continue anymore. In case of a soft interruption, the conversation need not be paused, while in case of a hard interruption, the conversation should be paused. The app also handles prolonged silence by pausing the conversation automatically.
Examples of soft interruptions - user backgrounds the app manually or user locks the phone. 
Examples of hard interruptions - user receives a phone call, music plays from other apps, internet connection is lost etc.


### Negative Cases

What can go wrong? Things can go wrong in 5 ways:

- Internet/Network error ✅
- Permissions not granted ✅
- Audio hardware issues - this needs to be handled by the agent itself
- Interruptions ✅ (whatever I could think of)
- System failure - if there is a delay in receiving audio/messages from ElevenLabs, we can probably do a visual enhancement that indicates deep thinking, if it goes for too long we can just say something is off, is your internet okay? Or contact support here.


