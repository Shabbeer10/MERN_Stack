import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <div>
                <Link
                    to={`/edit/${props.record._id}`}
                    style={{
                        backgroundColor: "green", 
                        color: "white", 
                        padding: "0.3rem 0.6rem", 
                        borderRadius: "4px", 
                        textDecoration: "none"
                    }}
                >
                    Edit
                </Link>
                <button
                    type='button'
                    style={{
                        backgroundColor: "#D32F2F", 
                        color: "white", 
                        border: "none", 
                        padding: "0.3rem 0.6rem", 
                        borderRadius: "4px", 
                        cursor: "pointer"
                    }}
                    onClick={() => { props.deleteRecord(props.record._id); }}
                >
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch('http://localhost:3000/record/');
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
    }, [records.length]);

    async function deleteRecord(id) {
        await fetch(`http://localhost:3000/record/${id}`, {
            method: "DELETE",
        });
        const newRecords = records.filter((el) => el._id == id);
        setRecords(newRecords);
    }

    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    key={record._id}
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                />
            );
        });
    }

    return (
        <>
            <h2 style={{ fontSize:"2rem", color: "#FF6F00", textAlign: "center" }}>Employee Records</h2>
            <div>
                <div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#FF6F00", color: "white" }}>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Level</th>
                                <th>Action</th>
                            </tr>
                        </thead >
                        <tbody style={{textAlign:"center"}}>{recordList()}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}