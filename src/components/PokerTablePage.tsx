import React from 'react'
import SimulatedPokerTable from './SimulatedPokerTable'
import { useNavigate } from "react-router-dom";
import { SummaryObj } from '../model/SummaryObj';

interface PokerTablePageProps {
    summary: SummaryObj | null;
}

const PokerTablePage = ({ summary }: PokerTablePageProps) => {


    const navigate = useNavigate();
    const handleClose = () => navigate('/');

    if (summary) {
        const log: string[][] = []
        let runLog: string[] = []

        for (let i = 1; i < summary.logs.length; i++) {
            runLog.push(summary.logs[i])

            if (runLog.includes("===")) {
                log.push(runLog)
                runLog = []
            }
        }
        return (
            <div className=' overflow-hidden'>
                <SimulatedPokerTable log={log} summary={summary} close={handleClose} />
            </div>
        )

    } else {
        console.log('log and summary are null')

        return <div>Log and Summary are null</div>
    }

}

export default PokerTablePage