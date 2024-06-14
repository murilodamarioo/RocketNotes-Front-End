import { Container, Form, Background } from './styles'
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'


export function SignIn() {
    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Faça seu login</h2>

                <Input 
                    placeholder="E-mail" 
                    type="text" 
                    icon={FiMail}
                />
                <Input 
                    placeholder="Senha" 
                    type="password" 
                    icon={FiLock}    
                />

                <Button title="Entrar"/>
                
                <Link to="/register">
                    Criar conta
                </Link>
            </Form>

            <Background />
        </Container>
    )
}