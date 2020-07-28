import React from 'react'
import { Upload, message, Button, Icon } from 'antd';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default class Upload_compent extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            compile:false,
        };
      }

    componentDidMount() {
        this.setState({
            compile:this.props.disabled
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            compile:nextProps.disabled
        })
    }

      render() {
          return (
              <Upload {...props}>
                  <Button disabled={!this.state.compile}>
                      <Icon type="upload" /> Click to Upload
                  </Button>
              </Upload>
          )
      }
}