<script setup>
import { useStore } from '../stores/main-store';
import SingOutIcon from '../icons/sign-out';
import { useI18n } from 'vue-i18n';

const store = useStore();

const profileSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-user me-2 text-body align-bottom">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>`;
</script>

<template>

  <a class="nav-link lh-1 pe-0"
     id="navbarDropdownUser"
     href="#"
     role="button"
     data-bs-toggle="dropdown"
     data-bs-auto-close="outside"
     aria-haspopup="true"
     aria-expanded="false"
  >
    <div class="avatar avatar-l ">
            <span
              v-if="!store.isAuth || !store.user?.avatar"
              class="no-avatar rounded-circle"
              v-html="svgNoAvatar"
            ></span>
      <img
        v-else-if="store.user?.avatar"
        class="rounded-circle"
        :src="store.user?.avatar"
      >
    </div>
  </a>
  <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border"
       aria-labelledby="navbarDropdownUser">

    <div class="card position-relative border-0">
      <div class="card-body p-0">
        <div class="text-center pt-4 pb-3">
          <div class="avatar avatar-xl ">
                    <span
                      v-if="!store.isAuth || !store.user?.avatar"
                      class="no-avatar rounded-circle"
                      v-html="svgNoAvatar"
                    ></span>
            <img
              v-else-if="store.user?.avatar"
              class="rounded-circle"
              :src="store.user?.avatar"
            >
          </div>
          <h6 class="mt-2 text-body-emphasis">dsf</h6>
        </div>
        <div class="mb-3 mx-3">
          <input class="form-control form-control-sm" id="statusUpdateInput" type="text"
                 placeholder="Update your status">
        </div>
      </div>
      <div class="overflow-auto scrollbar" style="height: 10rem;">
        <ul class="nav d-flex flex-column mb-2 pb-1">
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <template v-html="profileSvg"></template>
            <span>Profile</span></a></li>
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-pie-chart me-2 text-body align-bottom">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            Dashboard</a></li>
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-lock me-2 text-body align-bottom">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Posts &amp; Activity</a></li>
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-settings me-2 text-body align-bottom">
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings &amp; Privacy </a></li>
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-help-circle me-2 text-body align-bottom">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Help Center</a></li>
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-globe me-2 text-body align-bottom">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Language</a></li>
        </ul>
      </div>
      <div class="card-footer p-0 border-top border-translucent">
        <ul class="nav d-flex flex-column my-3">
          <li class="nav-item"><a class="nav-link px-3 d-block" href="#!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-user-plus me-2 text-body align-bottom">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Add another account</a></li>
        </ul>
        <hr>
        <div class="px-3">
          <a class="btn btn-ext-secondary d-flex flex-center w-100" href="#!">
            <span v-html="SingOutIcon"></span> Sign out</a>
        </div>
        <div class="my-2 text-center fw-bold fs-10 text-body-quaternary">
          <a class="text-body-quaternary me-1" href="#!">Privacy policy</a>
          •<a class="text-body-quaternary mx-1" href="#!">Terms</a>
          •<a class="text-body-quaternary ms-1" href="#!">Cookies</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
 #navbarDropdownUser .avatar {
   border: 1px solid white;
   border-radius: 50%;
   overflow: hidden;
   background: white;
 }
</style>