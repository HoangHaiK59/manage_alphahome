import { Container } from 'react-bootstrap';
import NavbarElement from '../components/navbar';
import { Route, Switch } from 'react-router-dom';
import Services from '../components/contents/service';
import News from '../components/contents/news';
import Content from '../components/contents';
import FormService from '../components/contents/service/form';
import FormPost from '../components/contents/news/form';

const ContainerElement = (props) => {
    return <Container fluid style={{minHeight: '100vh', paddingLeft:0 , paddingRight: 0}}>
        <NavbarElement />
        <Switch>
            <Route exact path="/" render={(props) => <Content {...props} title="Home" />} />
            <Route exact path="/services" render={(props) => <Services {...props} title="Services" />} />
            <Route exact path="/services/new-post" render={(props) => <FormService {...props} title="Add new post services" />
            } />
            <Route exact path="/news" render={(props) => <News {...props} title="Services" />} />
            <Route exact path="/news/new-post" render={(props) => <FormPost {...props} title="Add new post" />} />
        </Switch>
    </Container>
}

export default ContainerElement;