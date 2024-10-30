import {useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function Record(){
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    
}