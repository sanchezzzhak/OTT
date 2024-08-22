<script setup>
import { reactive } from 'vue';
import {useStore} from '../stores/main-store';

const pageIndicator = `<svg class="svg-inline--fa fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px;"
     aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img"
     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
  <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
</svg>`;

const dropdownIndicatorIcon = `<svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true"
     focusable="false" data-prefix="fas" data-icon="caret-right" role="img"
     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg="">
    <path fill="currentColor"
          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path>
</svg>`;

const isAuth = useStore().isAuth;
const navbarColId = 'navbarVerticalCollapse'
const navbarNavId = 'navbarVerticalNav'

let items = reactive([
  {label: 'Stats', to: {path: '/dashboard/stat'}, icon: 'bi bi-bar-chart', header: 'GLOBAL'},
  {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill', badge: 'test'},
  {label: 'Settings sub', icon: 'bi bi-gear-fill', items: [
      {label: 'Stats sub', to: {path: '/dashboard/stat'}, icon: 'bi bi-bar-chart', badge: 'test'},
      {label: 'Settings sub', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill'},
      {label: 'Settings sub2', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill', items: [
          {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill', badge: 'test'},
          {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill', badge: 'test'},
          {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill', badge: 'test'},
        ]
      }
    ]}
]);

const onOpenNav = (event) => {
  let li = event.target.closest('li');
  let key = 1 * li.dataset.id;
  items[key].active =  items[key].active ? false : true;

};

</script>


<template>
  <nav class="navbar navbar-vertical navbar-expand-lg"
       data-navbar-appearance="darker">
    <div class="collapse navbar-collapse" :id="navbarColId">
      <div class="navbar-vertical-content">
        <ul class="navbar-nav flex-column" :id="navbarNavId">

        <template v-for="(item, key) in items">
            <!-- single -->
            <template v-if="item.items === void 0">
              <li class="nav-item" :class="{active: item.active ?? false}" :data-id="key">
                <template v-if="item.header !== void 0">
                  <p class="navbar-vertical-label">{{ item.header }}</p>
                  <hr class="navbar-vertical-line">
                </template>
                <router-link class="nav-link label-1" :to="item.to" role="button" data-bs-toggle="" aria-expanded="false">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-icon">
                      <i class="icon" v-if="item.icon" :class="item.icon"></i>
                    </span>
                    <span class="nav-link-text-wrapper">
                      <span class="nav-link-text">{{ $t(item.label) }}</span>
                    </span>
                    <span v-if="item.indicator ?? false" v-html="pageIndicator"></span>
                    <span v-if="item.badge" class="badge ms-2 badge badge-ext badge-ext-warning">{{ item.badge }}</span>
                  </div>
                </router-link>
              </li>
            </template>
            <!-- parent level 1-->
          <template v-else-if="item.items !== void 0">
            <li class="nav-item-wrapper" :class="{active: item.active ?? false}" :data-id="key">
              <template v-if="item.header !== void 0">
                <p class="navbar-vertical-label">{{ item.header }}</p>
                <hr class="navbar-vertical-line">
              </template>
              <a
                 class="nav-link dropdown-indicator label-1"
                 :href="'#cl-'+key"
                 role="button"
                 data-bs-toggle="collapse"
                 aria-expanded="true"
                 aria-controls="cl-{{key}}"
              >
                <div class="d-flex align-items-center">
                  <div class="dropdown-indicator-icon-wrapper" v-html="dropdownIndicatorIcon"></div>
                  <span class="nav-link-icon"><i class="icon" v-if="item.icon" :class="item.icon"></i></span>
                  <span class="nav-link-text-wrapper"><span class="nav-link-text">{{ $t(item.label) }}</span></span>
                  <span v-if="item.indicator ?? false" v-html="pageIndicator"></span>
                  <span v-if="item.badge" class="badge ms-2 badge badge-ext badge-ext-warning">{{ item.badge }}</span>
                </div>
              </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent"
                    :data-bs-parent="'#'+navbarColId"
                    :id="'cl-'+ key">
                  <li class="collapsed-nav-item-title d-none">{{ $t(item.label) }}</li>
                  <li class="nav-item" v-for="(subItem, subKey) in item.items">

                    <template v-if="subItem.items === void 0">
                      <router-link
                        class="nav-link"
                        :class="{active: subItem.active ?? false}"
                        :to="subItem.to"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        :aria-controls="'cl-'+key"
                      >
                        <div class="d-flex align-items-center">
                          <span class="nav-link-text">{{ $t(subItem.label) }}</span>
                          <span v-if="subItem.badge" class="badge ms-2 badge badge-ext badge-ext-warning ">{{ subItem.badge }}</span>
                        </div>
                      </router-link>
                    </template>

                    <template v-else-if="subItem.items !== void 0">
                        <a class="nav-link dropdown-indicator"
                           :href="'#clp-' + subKey"
                           data-bs-toggle="collapse"
                           aria-expanded="true"
                           :aria-controls="'cl-' + key">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon-wrapper" v-html="dropdownIndicatorIcon"></div>
                            <span class="nav-link-text">{{ $t(subItem.label) }}</span>
                          </div>
                        </a>
                      <div class="parent-wrapper">
                        <ul class="nav collapse parent"
                            :data-bs-parent="'#cl-'+key"
                            :id="'clp-'+subKey">
                          <li class="nav-item" v-for="(sub2Item, sub2Key) in subItem.items">
                            <router-link
                              class="nav-link"
                              :class="{active: sub2Item.active ?? false}"
                              :to="sub2Item.to"
                              role="button"
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              :aria-controls="'clp-'+sub2Key"
                            >
                              <div class="d-flex align-items-center">
                                <span class="nav-link-text">{{ $t(sub2Item.label) }}</span>
                                <span v-if="sub2Item.badge" class="badge ms-2 badge badge-ext badge-ext-warning">
                                  {{ sub2Item.badge }}
                                </span>
                              </div>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </template>


                  </li>



                </ul>
              </div>
            </li>
          </template>
        </template>

        </ul>
      </div>
    </div>

    <div class="navbar-vertical-footer">
      <button class="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center">
        <span class="uil uil-left-arrow-to-left fs-8"></span>
        <span class="uil uil-arrow-from-right fs-8"></span>
        <span class="navbar-vertical-footer-text ms-2">Collapsed View</span>
      </button>
    </div>

  </nav>

</template>
