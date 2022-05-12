import { Button } from '@mui/material'
import * as React from 'react'
import { TestRunner } from '../Components/TestRunner/TestRunner'
import { PageWrapper } from '../styles'

export const TestPage: React.FC = () => {
    const [isStarted,setIsStarted] = React.useState(false)

    return <PageWrapper>
        {isStarted ? <TestRunner /> : <>
            <h3>Welcome to the test mode!</h3>
            <p>Please choose your language in header and run "START" button</p>
            <Button variant="contained" onClick={() => setIsStarted(true)}>START</Button>
        </>}
        
    </PageWrapper>
}