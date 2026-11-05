import React, {useState} from "react";
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert} from "react-native";
import {StatusBar as ExpoStatusBar} from "expo-status-bar";

const C = {bg:"#F5F7FB", ink:"#172033", muted:"#687386", red:"#E53935", white:"#FFFFFF", line:"#E8ECF3", green:"#138A58"};
const demo = [
  {title:"How I edit travel reels on phone", creator:"Creator Studio India", views:"2.4K views", tag:"Travel"},
  {title:"Simple mobile photography tips", creator:"Lens With Aman", views:"980 views", tag:"Tutorial"},
  {title:"My first short film — behind the scenes", creator:"FrameCraft", views:"1.2K views", tag:"Film"}
];

function Button({title,onPress,outline=false}) {
  return <TouchableOpacity onPress={onPress} style={{backgroundColor:outline?C.white:C.red,borderWidth:outline?1:0,borderColor:C.line,padding:14,borderRadius:13,alignItems:"center",marginTop:10}}>
    <Text style={{color:outline?C.ink:C.white,fontWeight:"800"}}>{title}</Text>
  </TouchableOpacity>;
}
function Field({placeholder,value,onChangeText}) {
  return <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText}
    placeholderTextColor="#98A1B1" style={{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:12,padding:14,marginTop:10,color:C.ink}} />;
}
export default function App() {
  const [tab,setTab]=useState("Home");
  const [name,setName]=useState("");
  const [link,setLink]=useState("");
  const [video,setVideo]=useState("");
  const [platform,setPlatform]=useState("YouTube");
  const [videoPlatform,setVideoPlatform]=useState("YouTube");
  const [email,setEmail]=useState("");
  const [signed,setSigned]=useState(false);
  const [items,setItems]=useState([]);
  const [saved,setSaved]=useState(false);
  const [profile,setProfile]=useState("Creator");

  const addChannel=()=>{if(!name.trim()||!link.trim()){Alert.alert("Missing details","Profile name aur link dono bharein.");return;} setItems([...items,{title:name,creator:link,tag:platform+" Profile"}]);setName("");setLink("");Alert.alert("Added",platform+" profile demo list mein add ho gaya.");};
  const addVideo=()=>{if(!video.trim()){Alert.alert("Video link required","Video ya post link paste karein.");return;}setItems([...items,{title:"Your submitted "+videoPlatform+" content",creator:video,tag:videoPlatform+" Content"}]);setVideo("");Alert.alert("Submitted","Content discovery review ke liye add hua (demo).");};
  const platformPicker=(selected,onSelect)=> <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:10,marginBottom:4}}>{["YouTube","Instagram","Facebook"].map(p=><TouchableOpacity key={p} onPress={()=>onSelect(p)} style={{paddingVertical:9,paddingHorizontal:13,borderRadius:20,marginRight:8,marginBottom:8,backgroundColor:selected===p?C.red:C.white,borderWidth:1,borderColor:selected===p?C.red:C.line}}><Text style={{fontWeight:"800",color:selected===p?C.white:C.ink}}>{p}</Text></TouchableOpacity>)}</View>;
  const card=(title,sub,tag)=> <View key={title+sub} style={{backgroundColor:C.white,borderRadius:16,padding:16,marginBottom:12,borderWidth:1,borderColor:C.line}}>
    <Text style={{fontSize:15,fontWeight:"800",color:C.ink}}>{title}</Text><Text style={{color:C.muted,marginTop:6}}>{sub}</Text>
    <Text style={{color:C.red,fontSize:11,fontWeight:"800",marginTop:10}}>{tag.toUpperCase()}</Text>
  </View>;
  const header=<View style={{padding:20,paddingBottom:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
    <View><Text style={{fontSize:25,fontWeight:"900",color:C.ink}}>Grow<Text style={{color:C.red}}>Mate</Text></Text><Text style={{color:C.muted,marginTop:2}}>Create • Discover • Grow</Text></View>
    <View style={{backgroundColor:"#FDE9E8",padding:10,borderRadius:12}}><Text style={{color:C.red,fontWeight:"900"}}>GM</Text></View>
  </View>;

  let body;
  if(!signed) body=<View style={{padding:20}}>
    <Text style={{fontSize:25,fontWeight:"900",color:C.ink}}>Welcome, creator 👋</Text>
    <Text style={{color:C.muted,marginTop:8,lineHeight:21}}>Discover creators and help people find content they genuinely enjoy.</Text>
    <Text style={{fontWeight:"800",color:C.ink,marginTop:24}}>Sign in to GrowMate</Text>
    <Field placeholder="Email address" value={email} onChangeText={setEmail}/>
    <Button title="Continue (demo)" onPress={()=>{if(!email.includes("@")){Alert.alert("Enter a valid email");return;}setSigned(true);}}/>
    <Text style={{color:C.muted,fontSize:12,marginTop:12}}>Demo sign-in only. Secure account authentication must be connected before public launch.</Text>
  </View>;
  else if(tab==="Home") body=<View style={{paddingHorizontal:20}}>
    <Text style={{fontSize:22,fontWeight:"900",color:C.ink}}>Discover creators</Text>
    <Text style={{color:C.muted,marginTop:5,marginBottom:16}}>Explore content by topic — choose what you actually like.</Text>
    {demo.map(x=>card(x.title,x.creator+"  •  "+x.views,x.tag))}
    {items.map(x=>card(x.title,x.creator,x.tag))}
    <Text style={{fontSize:12,color:C.muted,marginBottom:20}}>No paid views, forced subscriptions, or engagement exchange.</Text>
  </View>;
  else if(tab==="Add") body=<View style={{paddingHorizontal:20}}>
    <Text style={{fontSize:22,fontWeight:"900",color:C.ink}}>Add your social profile</Text>
    <Text style={{color:C.muted,marginTop:5}}>Choose a platform and share your public creator profile.</Text>
    {platformPicker(platform,setPlatform)}
    <Field placeholder="Creator / page / channel name" value={name} onChangeText={setName}/>
    <Field placeholder={"Paste "+platform+" profile URL"} value={link} onChangeText={setLink}/>
    <Button title="Add "+platform+" profile" onPress={addChannel}/>
    <View style={{height:1,backgroundColor:C.line,marginVertical:24}}/>
    <Text style={{fontSize:20,fontWeight:"900",color:C.ink}}>Submit content for discovery</Text>
    {platformPicker(videoPlatform,setVideoPlatform)}
    <Field placeholder={"Paste "+videoPlatform+" video / reel / post URL"} value={video} onChangeText={setVideo}/>
    <Button title="Submit "+videoPlatform+" content" onPress={addVideo}/>
    <Text style={{fontSize:12,color:C.muted,marginTop:14,lineHeight:18}}>Supported platforms: YouTube, Instagram and Facebook. Only public links are suitable for this demo. Users should discover content voluntarily; no paid or forced likes, views, follows or subscriptions.</Text>
  </View>;
  else if(tab==="Profile") body=<View style={{paddingHorizontal:20}}>
    <Text style={{fontSize:22,fontWeight:"900",color:C.ink}}>Your profile</Text>
    {card(email,"GrowMate member","PROFILE")}
    <Text style={{color:C.muted}}>Creator type</Text>
    <Field placeholder="Creator / Artist / Educator" value={profile} onChangeText={setProfile}/>
    <Button title="Save profile (demo)" onPress={()=>Alert.alert("Saved","Profile saved locally for this demo.")}/>
    <Button title="Sign out" outline onPress={()=>setSigned(false)}/>
  </View>;
  else body=<View style={{paddingHorizontal:20}}><Text style={{fontSize:22,fontWeight:"900",color:C.ink}}>Admin overview</Text>{card("Content review","Review submitted channels and videos before publishing.","ADMIN DEMO")}{card("User management","A protected server-side admin role is required.","SECURITY")}</View>;

  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}>
    <ExpoStatusBar style="dark"/><StatusBar barStyle="dark-content" backgroundColor={C.bg}/>
    {header}<ScrollView contentContainerStyle={{paddingBottom:28}}>{body}</ScrollView>
    {signed&&<View style={{flexDirection:"row",backgroundColor:C.white,borderTopWidth:1,borderColor:C.line,paddingVertical:12,justifyContent:"space-around"}}>
      {["Home","Add","Profile","Admin"].map(t=><TouchableOpacity key={t} onPress={()=>setTab(t)}><Text style={{fontWeight:"800",color:tab===t?C.red:C.muted}}>{t}</Text></TouchableOpacity>)}
    </View>}
  </SafeAreaView>;
}
