import React from 'react';
import Card from '../components/Card'
import Modal from '../components/Modal'
import CustomInput from '../components/CustomInput'
import styled from 'styled-components'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
const PostBtn = styled.span`
    display; inline-block;
    margin-top: 25px;
    width: 100%;
    background: red;
    border-radius: 5px;
    text-align: center;
    padding: 10px 0 ;
    opacity: ${props => props.active ? '0.5' : '1'};
    color: white ;
    
   
`
const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 400px 400px 400px;
    grid-gap: 16px;
    grid-template-rows: 0fr;
    justify-content: center;
    @media only screen and (max-width: 1276px) {
        grid-template-columns: 450px 450px;
    }
    @media only screen and (max-width: 1105px) {
        grid-template-columns: 400px 400px;
    }
    @media only screen and (max-width: 844px) {
        grid-template-columns: 400px;
    }

    @media only screen and (max-width: 480px) {
        grid-template-columns: 340px;
    }
   
`
const AddBtn = styled.div`
        position: fixed;
        bottom:10px;
        right:10px;
        padding: 10px;
        width: 100px;
        background: red;
        color: white;
        border-radius: 10px;
        text-align: center;

   
`
const NewPostWrapper = styled.div`
        display: flex;
        width: 250px;
        flex-direction: column;
        background: white;
        padding: 20px;
        border-radius: 5px;
        height: 270px;
        margin-top: 200px;
        z-index: 99;
        

   
`
class Home extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            fetching: false,
            newPostModal: false,
            title: null,
            body: null,
            addingPostLoader: false
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => this.setState({ data }));

    }

    delPost = (id) => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
        })
        let temp = this.state.data
        temp = temp.filter(item => item.id !== id)
        this.setState({ data: temp })
    }
    addPost = () => {
        this.setState({ addingPostLoader: true })
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                let temp = this.state.data
                temp = temp.concat(json)
                this.setState({ data: temp, addingPostLoader: false })
                this.cancelPost()
            })



    }

    errFree = () => {
        const { body, title } = this.state
        if (title === null || body == null) {
            return false
        } else {

            return true
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    closeModal = () => {
        this.setState({ newPostModal: false })
    }

    openNewPostModal = () => {
        this.setState({ newPostModal: true })
    }

    cancelPost = () => {
        this.setState({ newPostModal: false, title: '', body: '' })
    }
    render() {
        const { data, title, body, newPostModal, addingPostLoader } = this.state
        return (
            <div>
                <CardsWrapper>
                    {data && data.sort((a, b) => parseInt(b.id) - parseInt(a.id)).map((item, i) => {
                        return (<Card title={item.title} body={item.body} delPost={() => this.delPost(item.id)} key={i} />)
                    })}

                </CardsWrapper>
                <AddBtn onClick={this.openNewPostModal}> Add Post </AddBtn>

                {newPostModal &&
                    <Modal>
                        <NewPostWrapper>
                            {addingPostLoader &&
                                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                                    <Loader
                                        type="Puff"
                                        color="red"
                                        height={20}
                                        width={20} />
                                </div>
                            }

                            <CustomInput name='title' label='Title' value={title} onChange={this.onChange} />
                            <CustomInput name='body' label='Body' value={body} onChange={this.onChange} />
                            <PostBtn active={!this.errFree() || addingPostLoader} onClick={() => this.addPost()}>Post</PostBtn>
                            <PostBtn style={{ marginTop: 8 }} onClick={() => this.cancelPost()}>Cancel</PostBtn>
                        </NewPostWrapper>

                    </Modal>
                }

            </div>

        )
    }
}




export default (Home)