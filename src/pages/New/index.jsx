import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

import { api } from '../../services/api'

export function New() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState('')

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('')

    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
      }

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink])
        setNewLink('')
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag])
        setNewTag('')
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote() {
        if(!title) {
            return alert('Preencha o campo de título')
        }

        if(newLink) {
            return alert('Você não completou a adição de um dos links')
        }

        if(newTag) {
            return alert('Voce não completou a adição de uma das tags')
        }
    
        await api.post('/notes', {
            title,
            description,
            tags,
            links
        })

        alert('Nota criada com sucesso!')
        navigate(-1)
    }

    return (
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText 
                            onClick={handleBack} 
                            title="Voltar"
                        />
                    </header>

                    <Input 
                        placeholder="Título" 
                        onChange={event => setTitle(event.target.value)}
                    />

                    <Textarea 
                        placeholder="Observações" 
                        onChange={event => setDescription(event.target.value)}
                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link" 
                            value={newLink}
                            onChange={event => setNewLink(event.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew
                                placeholder="Nova tag"
                                value={newTag} 
                                onChange={event => setNewTag(event.target.value)}
                                onClick={handleAddTag}    
                            />
                        </div>
                    </Section>

                    <Button 
                        title="Salvar" 
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}