package expo.modules.audiointerruption

import android.content.Context
import android.media.AudioManager
import android.media.AudioManager.OnAudioFocusChangeListener
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AudioInterruptionModule : Module() {
  private var audioManager: AudioManager? = null
  private var focusListener: OnAudioFocusChangeListener? = null

  override fun definition() = ModuleDefinition {
    Name("AudioInterruption")

    Events("onInterruptionBegan", "onInterruptionEnded")

    OnCreate {
      audioManager = appContext.reactContext?.getSystemService(Context.AUDIO_SERVICE) as AudioManager

      focusListener = OnAudioFocusChangeListener { focusChange ->
        when (focusChange) {
          AudioManager.AUDIOFOCUS_LOSS,
          AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> sendEvent("onInterruptionBegan", mapOf<String, Any>())
          AudioManager.AUDIOFOCUS_GAIN -> sendEvent("onInterruptionEnded", mapOf<String, Any>())
        }
      }
    }

    OnDestroy {
      focusListener = null
    }
  }
}
