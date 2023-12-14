import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
    const endpointIssues = import.meta.env.VITE_ENDPOINT_ISSUES;
    const endpointPriorities = import.meta.env.VITE_ENDPOINT_PRIORITIES;
    const { token } = useAuth();

    const handleErrors = (response, customErrorSetter) => {
        console.log(response)
        if (!response.ok) {
            customErrorSetter && customErrorSetter(true);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    };

    const getIssues = async (setLoadingIssuesList, setErrorIssuesList) => {
        setLoadingIssuesList(true);
        setErrorIssuesList(false);

        try {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await fetch(endpointIssues, options);
            const data = await handleErrors(res, setErrorIssuesList);

            setIssues(data);
            getPrioritiesForIssuesList(setLoadingIssuesList, setErrorIssuesList);
        } catch (error) {
            console.error('Error fetching issues:', error);
        } finally {
            setLoadingIssuesList(false);
        }
    };

    const getPriorities = async (setErrorPriorities, setLoadingPriorities) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await fetch(endpointPriorities, options);
            const data = await handleErrors(res, setErrorPriorities);

            setPriorities(data);
        } catch (error) {
            console.error('Error fetching priorities:', error);
        } finally {
            setLoadingPriorities && setLoadingPriorities(false);
        }
    };

    const getPrioritiesForIssuesList = async (setLoadingIssuesList, setErrorIssuesList) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await fetch(endpointPriorities, options);
            const data = await handleErrors(res, setErrorIssuesList);

            setLoadingIssuesList(false);
            setPriorities(data);
        } catch (error) {
            console.error('Error fetching priorities for issues list:', error);
            setLoadingIssuesList(false);
        }
    };

    const createNewIssue = async (name, description, priority_id, setLoadingCreateIssue, toast, setErrorCreateIssue, navigate) => {
        try {
            const issue = {
                name,
                description,
                priority_id,
            };

            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(issue),
            };

            const res = await fetch(endpointIssues, options);
            const response = await handleErrors(res, setErrorCreateIssue);

            issue.id = response[0]
            issue.priority_id = parseInt(issue.priority_id)

            console.log(issue)

            toast.success('Issue creado con éxito 🚀');
            setIssues(prevIssues => [...prevIssues, issue]);
            setTimeout(() => {
                setLoadingCreateIssue(false);
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error creating new issue:', error);
        }
    };

    const deleteIssue = async (issue, toast, setOpenModal) => {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await fetch(`${endpointIssues}/${issue.id}`, options);
            await handleErrors(res);

            toast.success('Issue eliminada');
            const index = issues.indexOf(issue);
            index !== -1 && setIssues(issues.filter((_, i) => i !== index));
            setOpenModal(false);
        } catch (error) {
            console.error('Error deleting issue:', error);
            toast.error('Hubo un problema eliminando el issue');
        }
    };

    const patchIssue = async (issue, setLoading, toast, navigate) => {
        try {
            // Asegúrate de que el issue tenga un id y que priority_id sea un número
            if (!issue.id || typeof issue.priority_id !== 'number') {
                throw new Error('El issue debe tener un id y priority_id debe ser un número.');
            }
    
            const options = {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(issue),
            };
    
            const res = await fetch(`${endpointIssues}/${issue.id}`, options);
            await handleErrors(res);
    
            // Encontrar el índice del issue actualizado en el array local
            const updatedIssueIndex = issues.findIndex(i => i.id === issue.id);
    
            // Crear un nuevo array con el issue actualizado
            const updatedIssues = [...issues];
            updatedIssues[updatedIssueIndex] = issue;
    
            // Actualizar el estado local con el nuevo array
            setIssues(updatedIssues);
    
            toast.success('Editado con éxito');
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error patching issue:', error);
            setLoading(false);
            toast.error('Se produjo un error');
        }
    };

    const [priorities, setPriorities] = useState([]);
    const [issues, setIssues] = useState();

    return (
        <IssuesContext.Provider
            value={{
                getIssues,
                getPriorities,
                createNewIssue,
                priorities,
                deleteIssue,
                issues,
                setIssues,
                patchIssue,
            }}
        >
            {children}
        </IssuesContext.Provider>
    );
};

export const useIssues = () => {
    return useContext(IssuesContext);
};
