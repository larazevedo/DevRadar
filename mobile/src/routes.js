import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Importando as páginas
import Main from './pages/Main';
import Profile from './pages/Profile';

// Por fora de toda a aplicação
const Routes = createAppContainer(
  createStackNavigator({
    // Rotas da navegação
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil do GitHub'
      }
    }
  },{
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#7D40E7"
      }
    }
  }
  
  )
);

export default Routes;