import React, { useRef } from 'react'
import styled from 'styled-components'
import { useStoreDay } from '../../../store/dayStore'
import { useDebounce } from '../../../utils/useDebounce'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: fit-content;
`
const NotesArea = styled.textarea`
  margin: 0;
  background-color: ${({theme}) => theme.backgroundColors.card};
  border-radius: 5px;

  min-height: 100px;
  width: 100%;
  padding: 10px 15px;
  padding-bottom: 20px;

  border: 2px solid transparent;
  color: ${({theme}) => theme.textColors.secondary};
  font-size: ${({theme}) => theme.fontSizes.medium};

  height: fit-content;
  overflow-y: hidden;
  resize: none;

  display: none;
  white-space: pre-wrap;

  &:focus {
    background-color: inherit;
    border: 2px solid ${({theme}) => theme.textColors.secondary};
    color: ${({theme}) => theme.textColors.primary};

    outline: none;
  }
`
const PreformatArea = styled.pre`
  margin: 0;

  background-color: ${({theme}) => theme.backgroundColors.card};
  border-radius: 5px;

  min-height: 100px;
  width: 100%;
  padding: 10px 15px;
  padding-bottom: 20px;

  border: 2px solid transparent;
  color: ${({theme}) => theme.textColors.secondary};
  font-size: ${({theme}) => theme.fontSizes.medium};

  height: fit-content;
  overflow-y: hidden;

  word-break: break-all;
  cursor: text;
`
const TextCounter = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: ${({theme}) => theme.fontSizes.small};
  color: ${({theme}) => theme.textColors.secondary};
`

const MAX_NOTES_LENGTH = 500

const Notes = () => {
  const currentNotes = useStoreDay((state) => state.currentFormValues.notes)
  const counterRef = useRef<HTMLSpanElement>(null)
  const preformatRef = useRef<HTMLPreElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const {setNotes} = useStoreDay((state) => state.actions)
  const changeNotes = (notes: string) => {
    setNotes(notes || '')
  }
  const debouncedNotesChange = useDebounce(changeNotes, 1000)

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value || ''
    const valueLength = value.length
    if (valueLength >= MAX_NOTES_LENGTH) {
      value = value.slice(0, MAX_NOTES_LENGTH)
    }
    debouncedNotesChange(value)
    if (counterRef.current) {
      counterRef.current.innerText = `${value.length.toString()}/${MAX_NOTES_LENGTH}`
    }
    if (valueLength >= MAX_NOTES_LENGTH) return
    e.target.style.height = ''
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const handlePreFocus = () => {
    if (textareaRef.current && preformatRef.current) {
      const preArea = preformatRef.current
      const textArea = textareaRef.current

      preArea.style.display = 'none'
      textArea.style.display = 'block'
      textArea.focus()
    }
  }

  const handleTextBlur = () => {
    if (textareaRef.current && preformatRef.current) {
      const preArea = preformatRef.current
      const textArea = textareaRef.current

      preArea.style.display = 'block'
      textArea.style.display = 'none'
    }
  }

  return (
    <Wrapper>
      <NotesArea
        onBlur={handleTextBlur}
        ref={textareaRef}
        value={currentNotes}
        onInput={handleInput}
        placeholder="Add notes here..."
      />
      <PreformatArea onClick={handlePreFocus} ref={preformatRef}>
        {currentNotes || 'Add notes here...'}
      </PreformatArea>

      <TextCounter ref={counterRef}>
        {currentNotes.length}/{MAX_NOTES_LENGTH}
      </TextCounter>
    </Wrapper>
  )
}

export default Notes
