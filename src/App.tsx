import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  FadeIn,
  FadeInDown,
  Layout,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Phone,
  Mail,
  Search,
  Settings as SettingsIcon,
  ChevronRight,
  ArrowLeft,
  Moon,
  Bell,
  Shield,
  Info,
  LogOut,
  Plus
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// --- COLORS ---
const COLORS = {
  primary: '#4F46E5', // Indigo 600
  secondary: '#6366F1', // Indigo 500
  bg: '#F8FAFC', // Slate 50
  text: '#1E293B', // Slate 800
  textMuted: '#64748B', // Slate 500
  card: '#FFFFFF',
  border: '#E2E8F0', // Slate 200
  white: '#FFFFFF',
};

// --- DATA ---
const CONTACTS = [
  { id: '1', name: 'Alexander Wright', role: 'Product Designer', phone: '+1 (555) 012-3456', email: 'alex.wright@design.co', color: '#818CF8' },
  { id: '2', name: 'Sophia Chen', role: 'Software Engineer', phone: '+1 (555) 098-7654', email: 'sophia.c@tech.io', color: '#34D399' },
  { id: '3', name: 'Marcus Aurelius', role: 'Architect', phone: '+1 (555) 234-5678', email: 'marcus@legacy.com', color: '#F87171' },
  { id: '4', name: 'Elena Rodriguez', role: 'Marketing Lead', phone: '+1 (555) 345-6789', email: 'elena.r@growth.com', color: '#FB923C' },
  { id: '5', name: 'Julian Barnes', role: 'Content Strategist', phone: '+1 (555) 456-7890', email: 'j.barnes@words.com', color: '#60A5FA' },
  { id: '6', name: 'Maya Patel', role: 'Data Scientist', phone: '+1 (555) 567-8901', email: 'maya.patel@insight.ai', color: '#A78BFA' },
  { id: '7', name: 'Oliver Smith', role: 'Operations Manager', phone: '+1 (555) 678-9012', email: 'oliver.s@ops.org', color: '#F472B6' },
  { id: '8', name: 'Isabella Garcia', role: 'Creative Director', phone: '+1 (555) 789-0123', email: 'isabella@studio.net', color: '#2DD4BF' },
  { id: '9', name: 'Liam Wilson', role: 'Security Analyst', phone: '+1 (555) 890-1234', email: 'liam.w@secure.com', color: '#94A3B8' },
  { id: '10', name: 'Zara Khan', role: 'Frontend Engineer', phone: '+1 (555) 901-2345', email: 'zara.k@web.dev', color: '#FBBF24' },
];

// --- COMPONENTS ---

const MeshBackground = () => {
  const anim1 = useSharedValue(0);
  const anim2 = useSharedValue(0);

  useEffect(() => {
    anim1.value = withRepeat(withTiming(1, { duration: 8000 }), -1, true);
    anim2.value = withRepeat(withTiming(1, { duration: 12000 }), -1, true);
  }, []);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(anim1.value, [0, 1], [-20, 40]) },
      { translateY: interpolate(anim1.value, [0, 1], [-30, 20]) },
      { scale: interpolate(anim1.value, [0, 1], [1, 1.2]) },
    ],
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(anim2.value, [0, 1], [width - 100, width - 150]) },
      { translateY: interpolate(anim2.value, [0, 1], [100, 200]) },
      { scale: interpolate(anim2.value, [0, 1], [1.2, 0.9]) },
    ],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[COLORS.bg, '#EFF6FF', '#EEF2FF']}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.blob, styles.blob1, blob1Style]}>
        <LinearGradient colors={['#E0E7FF', '#C7D2FE']} style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Animated.View style={[styles.blob, styles.blob2, blob2Style]}>
        <LinearGradient colors={['#DBEAFE', '#BFDBFE']} style={StyleSheet.absoluteFill} />
      </Animated.View>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(248, 250, 252, 0.4)' }]} />
    </View>
  );
};

const Avatar = ({ name, color, size = 50 }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <View style={[styles.avatar, { backgroundColor: color, width: size, height: size, borderRadius: size / 2.2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  );
};

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// --- SCREENS ---

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MeshBackground />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.welcomeContent}>
          <Animated.View entering={FadeInDown.delay(200).duration(1000)} style={styles.iconContainer}>
            <View style={styles.welcomeIconCircle}>
              <User size={48} color={COLORS.primary} strokeWidth={1.5} />
            </View>
          </Animated.View>
          
          <View style={styles.welcomeTextContainer}>
            <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.welcomeTitle}>
              Connect with{'\n'}your network
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.welcomeSubtitle}>
              Management made elegant. Access your professional and personal contacts in a premium interface.
            </Animated.Text>
          </View>

          <Animated.View entering={FadeInDown.delay(800).duration(800)} style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('List')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <ArrowLeft size={20} color={COLORS.white} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const ListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const filteredContacts = CONTACTS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <MeshBackground />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Good morning,</Text>
            <Text style={styles.headerTitle}>Contacts</Text>
          </View>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <SettingsIcon size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={COLORS.textMuted} />
            <TextInput
              placeholder="Search contacts..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredContacts.map((contact, index) => (
            <Animated.View 
              key={contact.id}
              entering={FadeInDown.delay(index * 50).duration(600)}
              layout={Layout.springify()}
            >
              <TouchableOpacity 
                onPress={() => navigation.navigate('Detail', { contact })}
                activeOpacity={0.6}
              >
                <Card style={styles.contactCard}>
                  <Avatar name={contact.name} color={contact.color} />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactRole}>{contact.role}</Text>
                  </View>
                  <ChevronRight size={18} color={COLORS.border} />
                </Card>
              </TouchableOpacity>
            </Animated.View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>

        <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
          <Plus size={24} color={COLORS.white} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const DetailScreen = ({ route, navigation }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <MeshBackground />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={22} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitleSmall}>Details</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <Animated.View entering={FadeIn.duration(800)}>
              <Avatar name={contact.name} color={contact.color} size={100} />
            </Animated.View>
            <Animated.Text entering={FadeInDown.delay(200)} style={styles.profileName}>
              {contact.name}
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(300)} style={styles.profileRole}>
              {contact.role}
            </Animated.Text>
          </View>

          <View style={styles.detailActions}>
            <TouchableOpacity style={styles.actionCircle}>
              <Phone size={22} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCircle}>
              <Mail size={22} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCircle}>
              <Info size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Information</Text>
            <Card style={styles.detailCard}>
              <View style={styles.detailRow}>
                <View style={styles.detailIconBg}>
                  <Phone size={18} color={COLORS.primary} />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Mobile</Text>
                  <Text style={styles.detailValue}>{contact.phone}</Text>
                </View>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailRow}>
                <View style={styles.detailIconBg}>
                  <Mail size={18} color={COLORS.primary} />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>{contact.email}</Text>
                </View>
              </View>
            </Card>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Card style={styles.notesCard}>
              <Text style={styles.notesText}>
                Met at the design conference last year. Interested in collaborating on upcoming UX projects.
              </Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const Toggle = ({ value, onValueChange }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.toggleContainer,
        { backgroundColor: value ? COLORS.primary : COLORS.border }
      ]}
    >
      <Animated.View 
        style={[
          styles.toggleCircle,
          { transform: [{ translateX: value ? 20 : 0 }] }
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MeshBackground />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={22} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitleSmall}>Settings</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView style={styles.settingsList}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card style={styles.settingsCard}>
            <View style={styles.settingsRow}>
              <View style={styles.settingsLabelContainer}>
                <View style={[styles.detailIconBg, { backgroundColor: '#F0F9FF' }]}>
                  <Bell size={18} color="#0369A1" />
                </View>
                <Text style={styles.settingsLabel}>Notifications</Text>
              </View>
              <Toggle value={notifications} onValueChange={setNotifications} />
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.settingsRow}>
              <View style={styles.settingsLabelContainer}>
                <View style={[styles.detailIconBg, { backgroundColor: '#F8FAFC' }]}>
                  <Moon size={18} color={COLORS.text} />
                </View>
                <Text style={styles.settingsLabel}>Dark Mode</Text>
              </View>
              <Toggle value={darkMode} onValueChange={setDarkMode} />
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Security</Text>
          <Card style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsLabelContainer}>
                <View style={[styles.detailIconBg, { backgroundColor: '#FDF2F8' }]}>
                  <Shield size={18} color="#9D174D" />
                </View>
                <Text style={styles.settingsLabel}>Privacy Policy</Text>
              </View>
              <ChevronRight size={18} color={COLORS.border} />
            </TouchableOpacity>
          </Card>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// --- NAVIGATION ---

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.bg } }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="List" component={ListScreen} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  safeArea: {
    flex: 1,
  },
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.6,
    filter: Platform.OS === 'ios' ? 'blur(60px)' : undefined, // Native blur on iOS
  },
  blob1: {
    top: -50,
    left: -100,
  },
  blob2: {
    bottom: -50,
    right: -100,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 40,
  },
  welcomeIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  welcomeTextContainer: {
    marginBottom: 60,
  },
  welcomeTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 56,
    letterSpacing: -1,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginTop: 16,
    lineHeight: 26,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  headerTitleSmall: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginBottom: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  contactRole: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  profileRole: {
    fontSize: 16,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginTop: 4,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  detailCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '700',
  },
  detailDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  notesCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#F8FAFC',
  },
  notesText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  settingsList: {
    paddingTop: 10,
  },
  settingsCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  settingsLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 16,
  },
  toggleContainer: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 3,
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
    paddingVertical: 12,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
