import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <div>
                <Link to={`/edit/${props.record._id}`}>
                Edit
                </Link>
                <button
                type='button'
                onClick={()=>{props.deleteRecord(props.record._id);}}>
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // Fetch records from database.
    useEffect(()=>{
        async function getRecords() {
            const response = await fetch('http://localhost:3000/record/');
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                console.error(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
        return;
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
                key = {record._id}
                record={record}
                deleteRecord = {()=> deleteRecord(record._id)}
                />
            );
        });
    }

    return(
        <>
            <h3>Employee Records</h3>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Level</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{recordList()}</tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

