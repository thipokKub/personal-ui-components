/* [Status] Finished
*   Last Updated: 2018-01-18 13:48:44
*/

import React, { Component } from 'react';
// import _ from 'lodash';
import PropTypes from 'prop-types';

//generate Random id (hopefully unique)
function generateRandom(length) {
    let str = '';
    const Possible = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890-[]#&@%';
    for(let i = 0; i < length; i++) {
        str += Possible.charAt(Math.floor(Math.random() * Possible.length));
    }
    return str;
}

const PreviewImg = (props) => {
    const { onExit, parentClass, parentStyle, alt, ...other } = props;
    return (
        <div
            className={`preview-img ${parentClass ? parentClass : ''}`}
            style={parentStyle}
        >
            <img
                alt={alt}
                {...other}
            />
            <div
                className="exit-btn"
                onClick={onExit}
            />
        </div>
    );
}

const FileUploadGenerator = (themeName) => {
    class FileUpload extends Component {
        constructor(props) {
            super(props);
            this.state = {
                'name': generateRandom(15),
                'isWarning': false,
                'isStart': false,
                'filesBuffer': [],
                'imgPreviews': []
            };
            this.onFileChange = this.onFileChange.bind(this);
            this.onFileRemove = this.onFileRemove.bind(this);
            this.onUpdatePreviews = this.onUpdatePreviews.bind(this);
            this.onFileTouch = this.onFileTouch.bind(this);
        }

        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        onFileRemove(index) {
            if(index < 0 || index >= this.state.filesBuffer.length) return;
            let newBuffer = Array.from(this.state.filesBuffer);
            newBuffer.splice(index, 1)
            this.setState({
                'filesBuffer': newBuffer
            }, this.onUpdatePreviews)
        }

        onUpdatePreviews() {
            const files = this.state.filesBuffer;
            const filesPromise = files.reduce((arr, file) => {
                arr.push(new Promise((res) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        res(reader.result)
                    }
                }));
                return arr;
            }, []);

            Promise.all(filesPromise).then((datas) => {
                this.setState({
                    'imgPreviews': datas
                })
            })
        }

        onFileTouch() {
            this._me.value = '';
            this.setState({
                'imgPreviews': [],
                'filesBuffer': []
            }, this.onUpdatePreviews);
        }

        onFileChange() {
            if(this._isMounted) {
                const { onChange } = this.props;
                
                const files = this._me.files;

                if(files.length > 0) {
                    let filesBuffer = [];
                    Array.prototype.push.apply(filesBuffer, files);
                    this.setState({
                        'filesBuffer': filesBuffer
                    }, this.onUpdatePreviews)
                } else {
                    this.setState({
                        'imgPreviews': [],
                        'filesBuffer': []
                    })
                }

                if(!this.state.isStart) {
                    return (
                        this.setState({
                            isStart: true
                        })
                    );
                }
                if(this._me.files.length > 0 && this.state.isWarning) {
                    this.setState({
                        isWarning: false
                    })
                } else if(this._me.files.length <= 0 && !this.state.isWarning) {
                    this.setState({
                        isWarning: true
                    })
                } else {
                    this.forceUpdate();
                }
                typeof onChange === "function" && onChange(this.state.filesBuffer, this._me.files);
            }
        }

        render() {
            const { refFunc, multiple, text, isEnableImagePreview } = this.props;
            const { name, isWarning, isStart, enableWarning, imgPreviews } = this.state;
            let displayStr = typeof text === "string" && text.length >= 0 ? text : 'Select File';

            if (this._isMounted && this.state.filesBuffer.length > 0) {
                if (multiple) {
                    displayStr = `${this.state.filesBuffer.length} File${this.state.filesBuffer.length > 1 ? 's' : ''} Selected`
                } else if (this.state.filesBuffer.length === 1) {
                    displayStr = 'File Selected'
                }
            }

            const label = (
                <label htmlFor={name} onClick={this.onFileTouch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                    </svg>
                    <span className="name">{displayStr}</span>
                </label>
            )

            return (
                <div>
                    <div className="input-container inline-1 center" >
                        <input
                            ref={(me) => {
                                this._me = me;
                                refFunc && refFunc(me);
                            }}
                            type="file"
                            name={name}
                            id={name}
                            className="inputfile inputfile-2"
                            onChange={this.onFileChange}
                            multiple={multiple ? true : false}
                        />
                        { label }
                        {
                            enableWarning && isStart && <div
                                className="message"
                                style={{ color: !isWarning ? '#1db101' : 'red' }}
                            >
                                {!isWarning ? 'File selected' : 'No File Selected'}
                            </div>
                        }
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {
                        (isEnableImagePreview) && imgPreviews.map((src, ind) => {
                            return <PreviewImg onExit={() => this.onFileRemove(ind)} alt={`file-${ind}`} key={ind} src={src} />
                        })
                    }
                    </div>
                </div>
            );
        }
    }

    FileUpload.propTypes = {
        refFunc: PropTypes.func,
        className: PropTypes.string,
        text: PropTypes.string,
        onChange: PropTypes.func,
        isEnableImagePreview: PropTypes.bool
    }

    return FileUpload;
}

export default FileUploadGenerator;