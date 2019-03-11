import React from 'react';
import { Confirm } from 'semantic-ui-react';

const AppConfirm = ({ deleteConfirm }) => {

    const handleCancel = () => {
        
    }
    const handleConfirm = () => {

    }

    return (
      <div>
        <Confirm
          open={ deleteConfirm }
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </div>
    )
}

export default AppConfirm;