function TechnicianList(props) {
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {props.technicians && props.technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                            <td>{ technician.employee_id }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    )
}

export default TechnicianList; 