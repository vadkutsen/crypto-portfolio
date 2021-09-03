<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Sign In</span>
            <div class="input-field">
              <input
                  id="email"
                  type="text"
                  v-model.trim="email"
                  :class="{invalid: ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email)}"
              >
              <label for="email">Email</label>
              <small
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.required"
              >
              Email is required
              </small>
              <small
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
              >
              Email is invalid
              </small>
            </div>
            <div class="input-field">
              <input
                  id="password"
                  type="password"
                  v-model.trim="password"
                  :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength)}"
              >
              <label for="password">Password</label>
              <small
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required"
              >
              Password is required
              </small>
              <small
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
              >
              Password is too short ({{ password.length }} chars).
                Min length is {{$v.password.$params.minLength.min}} characters
              </small>
            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Sign In
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
            Do not have an account yet?
            <router-link to="/register">Sign up</router-link>
            </p>
        </div>
    </form>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  metaInfo() {
    return {
      title: this.$title('Login'),
    };
  },
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),
  mounted() {
    if (messages[this.$route.query.message]) {
      // This one will work with plugin when fixed
      this.$message(messages[this.$route.query.message]);
      // eslint-disable-next-line no-undef
      // M.toast({ html: messages[this.$route.query.message] });
    }
  },
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {
        // eslint-disable-next-line no-undef
        // M.toast({ html: e.message });
        console.log(e.message);
      }
    },
  },
};
</script>
