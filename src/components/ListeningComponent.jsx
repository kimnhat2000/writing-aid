import React from 'react'
import {Input} from 'semantic-ui-react'

import { dummySnippetData} from './tools'

const ListeningComponent = () => 
<div>
    <Input list='languages' placeholder='Choose language...' />
    <datalist id='languages'>
    {dummySnippetData.map((data,index)=>(
      <option key={index} value={data.shortcut} />
    ))}

    </datalist>
</div>


  export default ListeningComponent