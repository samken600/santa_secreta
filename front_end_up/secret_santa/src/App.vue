<template>
	<div id="app">
		<h1> {{title}} {{value}} </h1>
		<form id = "login">
			<label for="email">Email</label>
			<input type="text" id="email" name="user-email" >
			<label for="username">Username</label>
			<input type="text" id="username" name="user-username" >
			<input type="submit" id="submit-button" 
			value="Submit" @click="submit">
		</form>
		<p>
			{{input_values}}
		</p>
	</div>
</template>

<script>
import firebase from 'firebase';
export default {
	name: 'app',
	data () {
		return {
			title: "App section!",
			value: "1",
			input_values: "",
		}
	},
	methods:{
		inc: function(){
			this.value++;
		},
		take: function(hold){
			this.input_values = hold;
		},
		submit: function(uemail, uusername){
			let login = firebase.functions().httpsCallable('login');
			login({email: 'uemail', username: 'uusername'})
			.then(function(result){
				console.log(result);
			}).catch(function(error){
				console.error(error);
			});
		},

	}

}
</script>

<style>

</style>
