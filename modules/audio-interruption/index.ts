// Reexport the native module. On web, it will be resolved to AudioInterruptionModule.web.ts
// and on native platforms to AudioInterruptionModule.ts
export { default } from './src/AudioInterruptionModule';
export { default as AudioInterruptionView } from './src/AudioInterruptionView';
export * from  './src/AudioInterruption.types';
