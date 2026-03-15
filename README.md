# Marvin

This is Marvin, from Hitchhiker's Guide to the Galaxy. It's an AI bot built with ElevenLabs.

## Roadmap

- [x] Create an agent for Marvin using ElevenLabs.
- [x] Integrate ElevenLabs agent.
- [ ] Handle edge cases
  - [ ] Permissions
  - [ ] Prolonged silence
  - [x] No internet
  - [x] Disruptions
  - [x] App backgrounded - by user, due to phone call, phone locked etc.
- [x] Allow pausing and resuming conversations
- [x] UI Polish
- [ ] Sound effect for disruptions
- [x] Avatar
- [ ] Handle soft diruptions - e.g. user backgrounds app manually, should not pause the conversation

## Potential Improvements

- Voice agent handling actions like end chat upon user request
- Context from previous conversations
- Resumption of convestaion context can become huge

## Design

- States
- Pause/Resume
- End/Start
- Disruption handling
