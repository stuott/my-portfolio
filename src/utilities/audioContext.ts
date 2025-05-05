/**
 * A simple audio context to manage multiple audio players and ensure only one plays at a time
 */

class AudioPlayerManager {
  private currentlyPlaying: HTMLAudioElement | null = null;

  /**
   * Register an audio element to be managed by the AudioPlayerManager
   * @param audioElement The audio element to register
   */
  registerAudioElement(audioElement: HTMLAudioElement) {
    // Add play event listener to track the currently playing element
    audioElement.addEventListener("play", () => {
      // If there's already an element playing and it's not this one, pause it
      if (this.currentlyPlaying && this.currentlyPlaying !== audioElement) {
        this.currentlyPlaying.pause();
      }

      // Update the currently playing element
      this.currentlyPlaying = audioElement;
    });
  }
}

// Create a singleton instance of the AudioPlayerManager
export const audioPlayerManager = new AudioPlayerManager();
