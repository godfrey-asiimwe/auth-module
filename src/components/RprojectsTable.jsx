import React from "react";
import { BTd } from 'bootstrap-4-react';
import { BSpan } from 'bootstrap-4-react';

export default function Datatable({ data }){
    const columns = data[0] && Object.keys(data[0]);
   
    return (
        <div>
        <table style={{marginTop:20,borderWidth:"1px",borderColor:"#aaaaaa",borderStyle:'solid'}}>
            <thead style={{marginLeft:20}}>
                <tr>{data[0] && columns.map(heading => <th style={{marginTop: 75}}>{heading}</th>)}</tr>
            </thead>
            <tbody>
                {data.map(row=><tr>
                    {
                        columns.map(columns => <td style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{row[columns]}</td>)
                    }
                </tr>)}
            </tbody>
        </table>
    </div>
    );
}