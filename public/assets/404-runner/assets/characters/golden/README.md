# Golden Character

## Approved visual reference

`golden-character-approved-reference.png` is the user-approved visual direction. It is a reference sheet, not the normalized runtime sprite sheet.

Locked traits:

- 18×36 standing visual size;
- 36×36 transparent frame canvas where wide poses require it;
- long, voluminous dark hair;
- large dark glasses;
- warm medium-brown complexion;
- restrained black clothing;
- white shoe accents;
- idle, run A, run B, jump, duck, and game-over states.

`golden-character-sheet.png` is mechanically extracted from the approved reference with nearest-neighbour resampling. The runtime draws those exact normalized pixels rather than a manual reinterpretation.

The modular proof lives in `../modular/`. Its layer sheets and four composed variants all reuse the same six frames, frame dimensions, baseline, anchors, and gameplay hitboxes.
