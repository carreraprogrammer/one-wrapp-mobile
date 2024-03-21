import { IonInput, IonItem, IonTextarea } from "@ionic/react";
import { Note } from "../../interfaces/scenesTypes";
import { useState } from "react";

interface NoteFormProps {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<any>>;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, setNote }) => {

  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <IonItem color='tertiary'>
        <IonTextarea
          className={isFocused ? "input-item" : "script-popup-input"}
          value={note && note.note}
          color="tertiary"
          labelPlacement="stacked"
          label="Note"
          placeholder="INSERT NOTE"
          onIonChange={(e) => setNote((prevNote: any) => ({ ...prevNote, note: e.detail.value || '' }))}
          autoGrow
          style={{
            borderBottom: '1px solid var(--ion-color-light)',
            textTransform: 'uppercase'
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </IonItem>
    </>
  )
}

export default NoteForm;