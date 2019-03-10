import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Copy extends React.Component {
    state = {
        value: '',
        copied: false,
    };

    onPaste (e) {
    console.log(e.clipboardData.getData('Text'));
}

    render() {

        return (
            <div>
                <input value={this.state.value}
                    onChange={({ target: { value } }) => this.setState({ value, copied: false })} />

                <CopyToClipboard text={this.state.value}
                    onCopy={() => this.setState({ copied: true })}>

                    <button>Copy</button>
                </CopyToClipboard>

                {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            </div>
        );
    }
}


export default Copy;