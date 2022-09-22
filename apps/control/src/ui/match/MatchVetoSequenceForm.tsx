import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Alert, Button, Stack } from "@mantine/core"
import { useState } from "react"
import { Control, useFieldArray, UseFormSetValue } from "react-hook-form"
import { Bulb, Plus } from "tabler-icons-react"
import {
  VetoMode,
  VetoSequenceSettingsItem,
  VetoSettings,
} from "utils/schema/veto.schema"
import MatchvetoSequenceItem from "./MatchvetoSequenceItem"
import MatchVetoSequenceItemModal from "./MatchVetoSequenceItemForm"

interface Props {
  control: Control<VetoSettings>
  setValue: UseFormSetValue<VetoSettings>
  modes: VetoMode[]
  sequence: VetoSequenceSettingsItem[]
}
const MatchVetoSequenceForm = ({ control, modes, sequence = [] }: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [currentIndex, setCurrentIndex] = useState<number>(sequence.length)
  const { fields, append, remove, update, move } = useFieldArray({
    control,
    name: "sequence",
  })

  const [opened, setOpened] = useState(false)
  const onClose = () => setOpened(false)
  const open = () => {
    setCurrentIndex(sequence.length)
    setOpened(true)
  }

  const gotoPreviousSequence = (index: number) => {
    if (index === 0) return
    setCurrentIndex(index - 1)
  }

  const gotoNextSequence = (index: number) => {
    if (index > sequence.length) return
    setCurrentIndex(index + 1)
  }
  return (
    <Stack>
      <Alert icon={<Bulb />}>The step by step sequence of the veto.</Alert>
      <Button
        size="xs"
        onClick={open}
        leftIcon={<Plus size={16} />}
        sx={{ alignSelf: "flex-start" }}
      >
        Add Sequence
      </Button>
      <Stack ref={parent}>
        {fields.map((field, index) => (
          <MatchvetoSequenceItem
            upDisabled={index === 0}
            downDisabled={index === fields.length - 1}
            move={move}
            modes={modes}
            removeSequence={remove}
            key={field.id}
            index={index}
            sequence={field}
          />
        ))}
      </Stack>

      <MatchVetoSequenceItemModal
        control={control}
        append={append}
        opened={opened}
        onClose={onClose}
        modes={modes}
        sequenceNumber={currentIndex}
        gotoPreviousSequence={gotoPreviousSequence}
        gotoNextSequence={gotoNextSequence}
        sequence={sequence}
        update={update}
      />
    </Stack>
  )
}

export default MatchVetoSequenceForm
