function ModelList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>name</th>
            <th>picture</th>
            <th>manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {props.models && props.models.map(model => {
            return (
              <tr key={model.id}>
                <td>{ model.name }</td>
                <td><img src ={ model.picture_url } alt={model.name} style={{ width: '200px', height: '100px' }} /></td>
                <td>{ model.manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default ModelList;
