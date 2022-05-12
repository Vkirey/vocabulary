import * as React from 'react'
import { AddNewWordForm } from '../Components/AddNewWordForm'
import { PageWrapper } from './styles'
import { WordsTable } from '../Components/WordsTable'

export const HomePage: React.FC = () => {
    return <PageWrapper>
        <AddNewWordForm />
        <WordsTable />
    </PageWrapper>
}