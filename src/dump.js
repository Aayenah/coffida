// const onRefresh = useCallback(async () => {
//   setRefreshing(true);
//   setLoading(true);
//   setTimeout(() => {
//     setRefreshing(false);
//     setLoading(false);
//   }, 1000);
// }, []);

// async function resetCoordinates() {
//   try {
//     await AsyncStorage.removeItem('@lat');
//     await AsyncStorage.removeItem('@lng');
//   } catch (err) {
//     console.log(`cannot remove coords ${err}`);
//   }
// }
// resetCoordinates();

// const headerImg = require('../images/nero.jpg');

// <View style={styles.header}>
//  <Image source={headerImg} style={styles.img} />
// </View>;

// const [error, setError] = useState('');
// const [refreshing, setRefreshing] = useState(false);

// if (loading) {
//   return <ActivityIndicator size="large" color="blue" />;
// }

// return !getUser ? (
//   <View style={styles.container}>
//     <LoginButton />
//     <Text style={styles.or}>Or</Text>
//     <RegisterButton />
//   </View>
// ) : (
//   <View style={styles.container}>
//     <Text>{user && user.first_name}</Text>
//     <Text style={styles.or}>Logged in</Text>
//     <LogoutButton />
//   </View>
// );
// }

// useEffect(() => {
//   async function getId() {
//     setLoading(true);
//     const id = await getUserIdFromStorage();
//     const res = await getUserInfo(id);
//     setUser(res);
//     setLoading(false);
//     console.log(GLOBAL.TOKEN);
//     setLoading(false);
//   }
//   getId();
// }, [token]);
