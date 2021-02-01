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

// const [firstNameDisabled, setFirstNameDisabled] = useState(true);
// const [lastNameDisabled, setLastNameDisabled] = useState(true);
// const [emailDisabled, setEmailDisabled] = useState(true);
// const [passwordDisabled, setPasswordDisabled] = useState(true);

// rightIcon={
//   <Icon
//     name="edit"
//     type="font-awesome-5"
//     color="#424242"
//     solid
//     onPress={() => setFirstNameDisabled(!firstNameDisabled)}
//   />
// }

// fetch('http://10.0.2.2:3333/api/1.0.0/find', options)
//   .then((res) => res.json())
//   .then((data) => {
//     setCafes(data);
//     setLoading(false);
//   })
//   .catch((err) => {
//     // TODO: show alert to use
//     console.log(err);
//   });

// ? important
// async function getCurrentCoord() {
//   let currentCoord = null;
//   try {
//     const currentLat = await AsyncStorage.getItem('@lat');
//     const currentLng = await AsyncStorage.getItem('@lng');
//     if (currentLat !== null && currentLng !== null) {
//       currentCoord = { latitude: currentLat, longitude: currentLng };
//     }
//   } catch (err) {
//     console.log(`cannot retrieve coords ${err}`);
//   }
//   return currentCoord;
// }

// async function distanceInMiles() {
//   const currentCoord = await getCurrentCoord();
//   let inMiles = 0;
//   if (currentCoord && cafeCoord) {
//     const distanceInMeters = getDistance(currentCoord, cafeCoord);
//     inMiles = convertDistance(distanceInMeters, 'mi');
//     setDistance(inMiles);
//   } else {
//     // console.log('currentCoords null');
//   }
//   return inMiles;
// }

// useEffect(() => {
//   if (currentCoord) {
//     saveCoordinates();
//     cafes.forEach((c) => {
//       const cafeCoord = { latitude: c.latitude, longitude: c.longitude };
//       const miles = convertDistance(
//         getDistance(currentCoord, cafeCoord),
//         'mi',
//       );
//       // eslint-disable-next-line no-param-reassign
//       c.distance_from_user = miles.toFixed(1);
//     });
//     // nearbyCafes = cafes.filter((c) => c.distance_from_user < 100);
//     setLoading(false);
//   }
// }, [currentCoord]);
// ?

// async function fetchCafes() {
//   setLoading(true);
//   const token = await getUserTokenFromStorage();
//   const options = {
//     headers: {
//       'X-Authorization': token,
//     },
//   };

//   try {
//     const res = await fetch('http://10.0.2.2:3333/api/1.0.0/find', options);
//     const data = await res.json();
//     setCafes(data);
//     setLoading(false);
//   } catch (err) {
//     console.log(err);
//   }
// }

// <View style={styles.aspect_row}>
//  <AspectRating aspect="Quality" rating={cafe.avg_quality_rating} />
//  <AspectRating aspect="Price" rating={cafe.avg_price_rating} />
//  <AspectRating aspect="Cleanliness" rating={cafe.avg_clenliness_rating} />
// </View>;

// <View style={styles.container}>
//   <Rating
//     readonly
//     fractions={1}
//     startingValue={review.review_overallrating}
//     type="custom"
//     ratingColor={colors.primary}
//     ratingTextColor={colors.secondary}
//     ratingBackgroundColor="silver"
//     tintColor="white"
//     imageSize={16}
//     style={styles.stars}
//   />
//   <View style={styles.aspect_row}>
//     <AspectRating aspect="Quality" rating={review.review_qualityrating} />
//     <AspectRating aspect="Price" rating={review.review_pricerating} />
//     <AspectRating
//       aspect="Cleanliness"
//       rating={review.review_clenlinessrating}
//     />
//   </View>
//   <Text style={styles.body}>{review.review_body}</Text>
//   <LikeButton />
// </View>
