function ModelList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>name</th>
            <th>picture_url</th>
            <th>manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {props.models && props.models.map(model => {
            return (
              <tr key={model.id}>
                <td>{ model.name }</td>
                <td>{ model.picture_url }</td>
                <td>{ model.manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default ModelList;
