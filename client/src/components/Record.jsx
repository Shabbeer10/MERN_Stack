import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            setIsNew(false);
            const response = await fetch(
                `http://localhost:3000/record/${params.id.toString()}`
            );

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onsubmit(e) {
        e.preventDefault();
        const person = { ...form };
        try {
            let response;
            if (isNew) {
                response = await fetch("http://localhost:3000/record", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(person),
                });
            } else {
                response = await fetch(`http://localhost:3000/record/${params.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(person),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status code is: ${response.status}`)
            }
        } catch (error) {
            console.error("A problem occurred with your fetch operation: ", error);
        } finally {
            setForm({ name: "", position: "", level: "" });
            navigate("/");
        }
    }

    return (
        <>
            <h3 style={{ color: "#FF6F00" }}>Create or Update Employee Record</h3>
            <form onSubmit={onsubmit} style={{ backgroundColor: "#FFEDD5", padding: "2rem", borderRadius: "8px" }}>
                <div>
                    <h2>Employee Info</h2>
                    <p>This info will be displayed publicly.</p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="name" style={{ color: "#FF6F00" }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="First Last"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        style={{ padding: "0.5rem", marginTop: "0.5rem", width: "100%", border: "1px solid #FF6F00", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="position" style={{ color: "#FF6F00" }}>Position</label>
                    <input
                        type="text"
                        name="position"
                        id="position"
                        placeholder="Developer Advocate"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                        style={{ padding: "0.5rem", marginTop: "0.5rem", width: "100%", border: "1px solid #FF6F00", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <fieldset style={{ border: "1px solid #FF6F00", padding: "1rem" }}>
                        <legend style={{ color: "#FF6F00" }}>Position Options</legend>
                        <div>
                            <input
                                type="radio"
                                name="positionOptions"
                                id="positionIntern"
                                value="Intern"
                                checked={form.level == "Intern"}
                                onChange={(e) => updateForm({ level: e.target.value })}
                                style={{ marginRight: "0.5rem" }}
                            />
                            <label htmlFor="positionIntern">Intern</label>

                            <input
                                type="radio"
                                name="positionOptions"
                                id="positionJunior"
                                value="Junior"
                                checked={form.level == "Junior"}
                                onChange={(e) => updateForm({ level: e.target.value })}
                                style={{ marginLeft: "1rem", marginRight: "0.5rem" }}
                            />
                            <label htmlFor="positionJunior">Junior</label>

                            <input
                                type="radio"
                                name="positionOptions"
                                id="positionSenior"
                                value="Senior"
                                checked={form.level == "Senior"}
                                onChange={(e) => updateForm({ level: e.target.value })}
                                style={{ marginLeft: "1rem", marginRight: "0.5rem" }}
                            />
                            <label htmlFor="positionSenior">Senior</label>
                        </div>
                    </fieldset>
                </div>

                <input
                    type="submit"
                    value="Save Employee Record"
                    style={{
                        backgroundColor: "#FF6F00",
                        color: "white",
                        padding: "0.7rem 1.5rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        border: "none",
                    }}
                />
            </form>
        </>
    );
}
