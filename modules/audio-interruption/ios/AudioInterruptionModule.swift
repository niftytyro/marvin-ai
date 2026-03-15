import ExpoModulesCore
import AVFoundation

public class AudioInterruptionModule: Module {
  private var interruptionObserver: NSObjectProtocol?

  public func definition() -> ModuleDefinition {
    Name("AudioInterruption")

    Events("onInterruptionBegan", "onInterruptionEnded")

    OnCreate {
      interruptionObserver = NotificationCenter.default.addObserver(
        forName: AVAudioSession.interruptionNotification,
        object: nil,
        queue: .main
      ) { [weak self] notification in
        guard let type = notification.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,
              let interruptionType = AVAudioSession.InterruptionType(rawValue: type) else { return }

        if interruptionType == .began {
          self?.sendEvent("onInterruptionBegan", [:])
        } else if interruptionType == .ended {
          self?.sendEvent("onInterruptionEnded", [:])
        }
      }
    }

    OnDestroy {
      if let observer = interruptionObserver {
        NotificationCenter.default.removeObserver(observer)
      }
    }
  }
}
