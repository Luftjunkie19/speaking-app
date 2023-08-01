export class SpeakingTile {
  constructor(title, text, selectedVoice, id) {
    this.title = title;
    this.text = text;
    this.selectedVoice = selectedVoice;
    this.id = id;
    this.isClicked = false; // Add isClicked property
  }
}
