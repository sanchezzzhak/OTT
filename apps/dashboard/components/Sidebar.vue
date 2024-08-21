<template>
<!--  <div class="theme-gray navbar-vertical-content rounded-0 navigation&#45;&#45;sidebar" id="navbarVerticalCollapse">-->
<!--      <ul class="navbar-nav flex-column">-->
<!--        <li v-for="(item, key) in items"  class="nav-item" :class="{'has-sub': item.items !== void 0, active: item.active ?? false }" :data-id="key" >-->
<!--          <div class="nav-item-wrapper">-->

<!--            <template v-if="item.header">-->
<!--              <p class="navbar-vertical-label">{{item.header}}}</p>-->
<!--              <hr class="navbar-vertical-line">-->
<!--            </template>-->

<!--            <template v-if="item.items !== void 0">-->
<!--              <a-->
<!--                href="#{{item.href}}"-->
<!--                @click="onOpenNav"-->
<!--                class="nav-link dropdown-indicator label-1 collapsed"-->
<!--                role="button"-->
<!--                data-bs-toggle="collapse"-->
<!--                aria-expanded="false"-->
<!--                aria-controls="{{item.href}}"-->
<!--              >-->
<!--                <div class="d-flex align-items-center">-->
<!--                  <div class="dropdown-indicator-icon-wrapper"></div>-->
<!--                  <i class="nav-link-icon" v-if="item.icon" :class="item.icon"></i>-->
<!--                  <span class="nav-link-text">{{ $t(item.label) }}</span>-->
<!--                </div>-->


<!--              </a>-->
<!--              <div class="parent-wrapper label-1">-->
<!--                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" :id="item.href">-->
<!--                  <li v-for="subItem in item.items">-->
<!--                    <router-link class="navigation&#45;&#45;link" :to="subItem.to">-->
<!--                      <i class="icon" v-if="subItem.icon" :class="subItem.icon"></i>-->
<!--                      <span class="label">{{ $t(subItem.label) }}</span>-->
<!--                    </router-link>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </template>-->

<!--            <template v-else>-->
<!--              <router-link class="navigation&#45;&#45;link" :to="item.to">-->
<!--                <i class="icon" v-if="item.icon" :class="item.icon"></i>-->
<!--                <span class="label">{{ $t(item.label) }}</span>-->
<!--              </router-link>-->
<!--            </template>-->

<!--          </div>-->
<!--        </li>-->

<!--      </ul>-->

<!--  </div>-->


  <nav class="navbar navbar-vertical navbar-expand-lg" data-navbar-appearance="darker">
    <div class="collapse navbar-collapse" id="navbarVerticalCollapse">

      <div class="navbar-vertical-content">
        <ul class="navbar-nav flex-column" id="navbarVerticalNav">


          <sitebar-nav-item v-for="(item, key) in items" :item="item" :key="key"></sitebar-nav-item>






          <li class="nav-item">
            <!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-home" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="nv-home">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg></span><span class="nav-link-text">Home</span><svg class="svg-inline--fa fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg><!-- <span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span> Font Awesome fontawesome.com -->
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent show" data-bs-parent="#navbarVerticalCollapse" id="nv-home">
                  <li class="collapsed-nav-item-title d-none">Home</li>
                  <li class="nav-item"><a class="nav-link active" href="index.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">E commerce</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="dashboard/project-management.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Project management</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="dashboard/crm.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">CRM</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="dashboard/travel-agency.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Travel agency</span><span class="badge ms-2 badge badge-ext badge-ext-warning ">New</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/social/feed.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Social feed</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <!-- label-->
            <p class="navbar-vertical-label">Apps</p>
            <hr class="navbar-vertical-line"><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-e-commerce" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-e-commerce">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></span><span class="nav-link-text">E commerce</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-e-commerce">
                  <li class="collapsed-nav-item-title d-none">E commerce</li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-admin" data-bs-toggle="collapse" aria-expanded="true" aria-controls="nv-admin">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Admin</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent show" data-bs-parent="#e-commerce" id="nv-admin">
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/add-product.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Add product</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/products.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Products</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/customers.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Customers</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/customer-details.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Customer details</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/orders.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Orders</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/order-details.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Order details</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/admin/refund.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Refund</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-customer" data-bs-toggle="collapse" aria-expanded="true" aria-controls="nv-customer">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Customer</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent show" data-bs-parent="#e-commerce" id="nv-customer">
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/homepage.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Homepage</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Product details</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/products-filter.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Products filter</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/cart.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Cart</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/checkout.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Checkout</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/shipping-info.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Shipping info</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/profile.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Profile</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/favourite-stores.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Favourite stores</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/wishlist.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Wishlist</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/order-tracking.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Order tracking</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/e-commerce/landing/invoice.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Invoice</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper">
              <a class="nav-link dropdown-indicator label-1" href="#nv-CRM" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-CRM">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span><span class="nav-link-text">CRM</span>
              </div>
              </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-CRM">
                  <li class="collapsed-nav-item-title d-none">CRM</li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/analytics.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Analytics</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/deals.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Deals</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/deal-details.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Deal details</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/leads.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Leads</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/lead-details.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Lead details</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/reports.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Reports</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/report-details.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Report details</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/crm/add-contact.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Add contact</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-project-management" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-project-management">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></span><span class="nav-link-text">Project management</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-project-management">
                  <li class="collapsed-nav-item-title d-none">Project management</li>
                  <li class="nav-item"><a class="nav-link" href="apps/project-management/create-new.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Create new</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/project-management/project-list-view.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Project list view</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/project-management/project-card-view.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Project card view</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/project-management/project-board-view.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Project board view</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/project-management/todo-list.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Todo list</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/project-management/project-details.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Project details</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-travel-agency" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-travel-agency">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></span><span class="nav-link-text">Travel agency</span><svg class="svg-inline--fa fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg><!-- <span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span> Font Awesome fontawesome.com -->
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-travel-agency">
                  <li class="collapsed-nav-item-title d-none">Travel agency</li>
                  <li class="nav-item"><a class="nav-link" href="apps/travel-agency/landing.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Landing</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-hotel" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-hotel">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Hotel</span><svg class="svg-inline--fa fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg><!-- <span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span> Font Awesome fontawesome.com -->
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#travel-agency" id="nv-hotel">
                        <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-hotel-admin" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-hotel-admin">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Admin</span>
                          </div>
                        </a><!-- more inner pages-->
                          <div class="parent-wrapper">
                            <ul class="nav collapse parent" data-bs-parent="#hotel" id="nv-hotel-admin">
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/admin/add-property.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Add property</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/admin/add-room.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Add room</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/admin/room-listing.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Room listing</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/admin/room-search.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Search room</span></div>
                              </a><!-- more inner pages-->
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-hotel-customer" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-hotel-customer">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Customer</span><svg class="svg-inline--fa fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg><!-- <span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span> Font Awesome fontawesome.com -->
                          </div>
                        </a><!-- more inner pages-->
                          <div class="parent-wrapper">
                            <ul class="nav collapse parent" data-bs-parent="#hotel" id="nv-hotel-customer">
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/customer/homepage.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Homepage</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/customer/hotel-details.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Hotel details</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/customer/hotel-compare.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Hotel compare</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/customer/checkout.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Checkout</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/customer/payment.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Payment</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="apps/travel-agency/hotel/customer/gallery.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Gallery</span><span class="badge ms-2 badge badge-ext badge-ext-warning ">new</span></div>
                              </a><!-- more inner pages-->
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-flight" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-flight">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Flight</span><span class="badge ms-2 badge badge-ext badge-ext-warning ">New</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#travel-agency" id="nv-flight">
                        <li class="nav-item"><a class="nav-link" href="apps/travel-agency/flight/homepage.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Homepage</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/travel-agency/flight/booking.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Booking</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/travel-agency/flight/payment.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Payment</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-trip" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-trip">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Trip</span><span class="badge ms-2 badge badge-ext badge-ext-warning ">new</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#travel-agency" id="nv-trip">
                        <li class="nav-item"><a class="nav-link" href="apps/travel-agency/trip/homepage.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Homepage</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/travel-agency/trip/trip-details.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Trip details</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="apps/travel-agency/trip/checkout.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Checkout</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="apps/chat.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Chat</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-email" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-email">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span><span class="nav-link-text">Email</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-email">
                  <li class="collapsed-nav-item-title d-none">Email</li>
                  <li class="nav-item"><a class="nav-link" href="apps/email/inbox.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Inbox</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/email/email-detail.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Email detail</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/email/compose.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Compose</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-events" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-events">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></span><span class="nav-link-text">Events</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-events">
                  <li class="collapsed-nav-item-title d-none">Events</li>
                  <li class="nav-item"><a class="nav-link" href="apps/events/create-an-event.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Create an event</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/events/event-detail.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Event detail</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-kanban" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-kanban">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trello"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect></svg></span><span class="nav-link-text">Kanban</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-kanban">
                  <li class="collapsed-nav-item-title d-none">Kanban</li>
                  <li class="nav-item"><a class="nav-link" href="apps/kanban/kanban.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Kanban</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/kanban/boards.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Boards</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/kanban/create-kanban-board.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Create board</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-social" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-social">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></span><span class="nav-link-text">Social</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-social">
                  <li class="collapsed-nav-item-title d-none">Social</li>
                  <li class="nav-item"><a class="nav-link" href="apps/social/profile.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Profile</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="apps/social/settings.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Settings</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="apps/calendar.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Calendar</span></span></div>
            </a></div>
          </li>
          <li class="nav-item">
            <!-- label-->
            <p class="navbar-vertical-label">Pages</p>
            <hr class="navbar-vertical-line"><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="pages/starter.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Starter</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-faq" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-faq">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span><span class="nav-link-text">Faq</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-faq">
                  <li class="collapsed-nav-item-title d-none">Faq</li>
                  <li class="nav-item"><a class="nav-link" href="pages/faq/faq-accordion.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Faq accordion</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="pages/faq/faq-tab.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Faq tab</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-landing" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-landing">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></span><span class="nav-link-text">Landing</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-landing">
                  <li class="collapsed-nav-item-title d-none">Landing</li>
                  <li class="nav-item"><a class="nav-link" href="pages/landing/default.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Default</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="pages/landing/alternate.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Alternate</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-pricing" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-pricing">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></span><span class="nav-link-text">Pricing</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-pricing">
                  <li class="collapsed-nav-item-title d-none">Pricing</li>
                  <li class="nav-item"><a class="nav-link" href="pages/pricing/pricing-column.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Pricing column</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="pages/pricing/pricing-grid.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Pricing grid</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="pages/notifications.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Notifications</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="pages/members.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Members</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="pages/timeline.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Timeline</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-errors" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-errors">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span><span class="nav-link-text">Errors</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-errors">
                  <li class="collapsed-nav-item-title d-none">Errors</li>
                  <li class="nav-item"><a class="nav-link" href="pages/errors/404.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">404</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="pages/errors/403.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">403</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="pages/errors/500.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">500</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-authentication" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-authentication">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span><span class="nav-link-text">Authentication</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-authentication">
                  <li class="collapsed-nav-item-title d-none">Authentication</li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-simple" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-simple">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Simple</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#authentication" id="nv-simple">
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/sign-in.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign in</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/sign-up.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign up</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/sign-out.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign out</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/forgot-password.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Forgot password</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/reset-password.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Reset password</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/lock-screen.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Lock screen</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/2FA.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">2FA</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-split" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-split">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Split</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#authentication" id="nv-split">
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/sign-in.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign in</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/sign-up.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign up</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/sign-out.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign out</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/forgot-password.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Forgot password</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/reset-password.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Reset password</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/lock-screen.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Lock screen</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/split/2FA.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">2FA</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-Card" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-Card">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Card</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#authentication" id="nv-Card">
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/sign-in.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign in</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/sign-up.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign up</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/sign-out.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sign out</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/forgot-password.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Forgot password</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/reset-password.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Reset password</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/lock-screen.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Lock screen</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="pages/authentication/card/2FA.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">2FA</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-layouts" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-layouts">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span><span class="nav-link-text">Layouts</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-layouts">
                  <li class="collapsed-nav-item-title d-none">Layouts</li>
                  <li class="nav-item"><a class="nav-link" href="demo/vertical-sidenav.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Vertical sidenav</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/dark-mode.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Dark mode</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/sidenav-collapse.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Sidenav collapse</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/darknav.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Darknav</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/topnav-slim.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Topnav slim</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/navbar-horizontal.html" target="_blank">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Navbar horizontal</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/horizontal-slim.html" target="_blank">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Horizontal slim</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/combo-nav.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Combo nav</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/combo-nav-slim.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Combo nav slim</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="demo/dual-nav.html" target="_blank">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Dual nav</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <!-- label-->
            <p class="navbar-vertical-label">Modules</p>
            <hr class="navbar-vertical-line"><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-forms" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-forms">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span><span class="nav-link-text">Forms</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-forms">
                  <li class="collapsed-nav-item-title d-none">Forms</li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-basic" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-basic">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Basic</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#forms" id="nv-basic">
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/form-control.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Form control</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/input-group.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Input group</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/select.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Select</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/checks.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Checks</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/range.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Range</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/floating-labels.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Floating labels</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/basic/layout.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Layout</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-advance" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-advance">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Advance</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#forms" id="nv-advance">
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/advance-select.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Advance select</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/date-picker.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Date picker</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/editor.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Editor</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/file-uploader.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">File uploader</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/range.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Range</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/rating.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Rating</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/forms/advance/emoji-button.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Emoji button</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/forms/validation.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Validation</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/forms/wizard.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Wizard</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-icons" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-icons">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span><span class="nav-link-text">Icons</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-icons">
                  <li class="collapsed-nav-item-title d-none">Icons</li>
                  <li class="nav-item"><a class="nav-link" href="modules/icons/feather.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Feather</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/icons/font-awesome.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Font awesome</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/icons/unicons.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Unicons</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-tables" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-tables">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-columns"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path></svg></span><span class="nav-link-text">Tables</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-tables">
                  <li class="collapsed-nav-item-title d-none">Tables</li>
                  <li class="nav-item"><a class="nav-link" href="modules/tables/basic-tables.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Basic tables</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/tables/advance-tables.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Advance tables</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/tables/bulk-select.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Bulk Select</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-ECharts" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-ECharts">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span><span class="nav-link-text">ECharts</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-ECharts">
                  <li class="collapsed-nav-item-title d-none">ECharts</li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/line-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Line charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/bar-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Bar charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/candlestick-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Candlestick charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/geo-map.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Geo map</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/scatter-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Scatter charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/pie-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Pie charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/gauge-chart.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Gauge chart</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/radar-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Radar charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/heatmap-charts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Heatmap charts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/echarts/how-to-use.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">How to use</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-components" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-components">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></span><span class="nav-link-text">Components</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-components">
                  <li class="collapsed-nav-item-title d-none">Components</li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/accordion.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Accordion</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/avatar.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Avatar</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/alerts.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Alerts</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/badge.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Badge</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/breadcrumb.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Breadcrumb</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/button.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Buttons</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="modules/components/calendar.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Calendar</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/card.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Card</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-carousel" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-carousel">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Carousel</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#components" id="nv-carousel">
                        <li class="nav-item"><a class="nav-link" href="modules/components/carousel/bootstrap.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Bootstrap</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/components/carousel/swiper.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Swiper</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/collapse.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Collapse</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/dropdown.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Dropdown</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/list-group.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">List group</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/modal.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Modals</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-navs-_and_-Tabs" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-navs-_and_-Tabs">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Navs &amp; Tabs</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#components" id="nv-navs-_and_-Tabs">
                        <li class="nav-item"><a class="nav-link" href="modules/components/navs-and-tabs/navs.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Navs</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/components/navs-and-tabs/navbar.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Navbar</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="modules/components/navs-and-tabs/tabs.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Tabs</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/offcanvas.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Offcanvas</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/progress-bar.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Progress bar</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/placeholder.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Placeholder</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/pagination.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Pagination</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/popovers.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Popovers</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/scrollspy.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Scrollspy</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/sortable.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Sortable</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/spinners.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Spinners</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/toast.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Toast</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/tooltips.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Tooltips</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/typed-text.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Typed text</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/components/chat-widget.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Chat widget</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-utilities" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-utilities">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg></span><span class="nav-link-text">Utilities</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-utilities">
                  <li class="collapsed-nav-item-title d-none">Utilities</li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/background.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Background</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/borders.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Borders</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/colors.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Colors</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/display.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Display</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/flex.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Flex</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/stacks.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Stacks</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/float.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Float</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/grid.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Grid</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/interactions.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Interactions</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/opacity.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Opacity</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/overflow.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Overflow</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/position.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Position</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/shadows.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Shadows</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/sizing.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Sizing</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/spacing.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Spacing</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/typography.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Typography</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/vertical-align.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Vertical align</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="modules/utilities/visibility.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Visibility</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="widgets.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Widgets</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-multi-level" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-multi-level">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></span><span class="nav-link-text">Multi level</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-multi-level">
                  <li class="collapsed-nav-item-title d-none">Multi level</li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-level-two" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-level-two">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Level two</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#multi-level" id="nv-level-two">
                        <li class="nav-item"><a class="nav-link" href="#!.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Item 1</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="#!.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Item 2</span></div>
                        </a><!-- more inner pages-->
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-level-three" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-level-three">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Level three</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#multi-level" id="nv-level-three">
                        <li class="nav-item"><a class="nav-link" href="#!.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Item 3</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-item-4" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-item-4">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Item 4</span>
                          </div>
                        </a><!-- more inner pages-->
                          <div class="parent-wrapper">
                            <ul class="nav collapse parent" data-bs-parent="#level-three" id="nv-item-4">
                              <li class="nav-item"><a class="nav-link" href="#!.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 5</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="#!.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 6</span></div>
                              </a><!-- more inner pages-->
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-level-four" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-level-four">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Level four</span>
                    </div>
                  </a><!-- more inner pages-->
                    <div class="parent-wrapper">
                      <ul class="nav collapse parent" data-bs-parent="#multi-level" id="nv-level-four">
                        <li class="nav-item"><a class="nav-link" href="#!.html">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Item 6</span></div>
                        </a><!-- more inner pages-->
                        </li>
                        <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-item-7" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-item-7">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Item 7</span>
                          </div>
                        </a><!-- more inner pages-->
                          <div class="parent-wrapper">
                            <ul class="nav collapse parent" data-bs-parent="#level-four" id="nv-item-7">
                              <li class="nav-item"><a class="nav-link" href="#!.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 8</span></div>
                              </a><!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-item-9" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-item-9">
                                <div class="d-flex align-items-center">
                                  <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-text">Item 9</span>
                                </div>
                              </a><!-- more inner pages-->
                                <div class="parent-wrapper">
                                  <ul class="nav collapse parent" data-bs-parent="#item-7" id="nv-item-9">
                                    <li class="nav-item"><a class="nav-link" href="#!.html">
                                      <div class="d-flex align-items-center"><span class="nav-link-text">Item 10</span></div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link" href="#!.html">
                                      <div class="d-flex align-items-center"><span class="nav-link-text">Item 11</span></div>
                                    </a><!-- more inner pages-->
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <!-- label-->
            <p class="navbar-vertical-label">Documentation</p>
            <hr class="navbar-vertical-line"><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="documentation/getting-started.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-life-buoy"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Getting started</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-customization" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-customization">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span><span class="nav-link-text">Customization</span><svg class="svg-inline--fa fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg><!-- <span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span> Font Awesome fontawesome.com -->
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-customization">
                  <li class="collapsed-nav-item-title d-none">Customization</li>
                  <li class="nav-item"><a class="nav-link" href="documentation/customization/configuration.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Configuration</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/customization/styling.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Styling</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/customization/color.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Color</span><span class="badge ms-2 badge badge-ext badge-ext-warning ">New</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/customization/dark-mode.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Dark mode</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/customization/plugin.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Plugin</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-layouts-doc" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-layouts-doc">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper"><svg class="svg-inline--fa fa-caret-right dropdown-indicator-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg><!-- <span class="fas fa-caret-right dropdown-indicator-icon"></span> Font Awesome fontawesome.com --></div><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg></span><span class="nav-link-text">Layouts doc</span>
              </div>
            </a>
              <div class="parent-wrapper label-1">
                <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-layouts-doc">
                  <li class="collapsed-nav-item-title d-none">Layouts doc</li>
                  <li class="nav-item"><a class="nav-link" href="documentation/layouts/vertical-navbar.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Vertical navbar</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/layouts/horizontal-navbar.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Horizontal navbar</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/layouts/combo-navbar.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Combo navbar</span></div>
                  </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item"><a class="nav-link" href="documentation/layouts/dual-nav.html">
                    <div class="d-flex align-items-center"><span class="nav-link-text">Dual nav</span></div>
                  </a><!-- more inner pages-->
                  </li>
                </ul>
              </div>
            </div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="documentation/gulp.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg class="svg-inline--fa fa-gulp ms-1 me-1 fa-lg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="gulp" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M209.8 391.1l-14.1 24.6-4.6 80.2c0 8.9-28.3 16.1-63.1 16.1s-63.1-7.2-63.1-16.1l-5.8-79.4-14.9-25.4c41.2 17.3 126 16.7 165.6 0zm-196-253.3l13.6 125.5c5.9-20 20.8-47 40-55.2 6.3-2.7 12.7-2.7 18.7.9 5.2 3 9.6 9.3 10.1 11.8 1.2 6.5-2 9.1-4.5 9.1-3 0-5.3-4.6-6.8-7.3-4.1-7.3-10.3-7.6-16.9-2.8-6.9 5-12.9 13.4-17.1 20.7-5.1 8.8-9.4 18.5-12 28.2-1.5 5.6-2.9 14.6-.6 19.9 1 2.2 2.5 3.6 4.9 3.6 5 0 12.3-6.6 15.8-10.1 4.5-4.5 10.3-11.5 12.5-16l5.2-15.5c2.6-6.8 9.9-5.6 9.9 0 0 10.2-3.7 13.6-10 34.7-5.8 19.5-7.6 25.8-7.6 25.8-.7 2.8-3.4 7.5-6.3 7.5-1.2 0-2.1-.4-2.6-1.2-1-1.4-.9-5.3-.8-6.3.2-3.2 6.3-22.2 7.3-25.2-2 2.2-4.1 4.4-6.4 6.6-5.4 5.1-14.1 11.8-21.5 11.8-3.4 0-5.6-.9-7.7-2.4l7.6 79.6c2 5 39.2 17.1 88.2 17.1 49.1 0 86.3-12.2 88.2-17.1l10.9-94.6c-5.7 5.2-12.3 11.6-19.6 14.8-5.4 2.3-17.4 3.8-17.4-5.7 0-5.2 9.1-14.8 14.4-21.5 1.4-1.7 4.7-5.9 4.7-8.1 0-2.9-6-2.2-11.7 2.5-3.2 2.7-6.2 6.3-8.7 9.7-4.3 6-6.6 11.2-8.5 15.5-6.2 14.2-4.1 8.6-9.1 22-5 13.3-4.2 11.8-5.2 14-.9 1.9-2.2 3.5-4 4.5-1.9 1-4.5.9-6.1-.3-.9-.6-1.3-1.9-1.3-3.7 0-.9.1-1.8.3-2.7 1.5-6.1 7.8-18.1 15-34.3 1.6-3.7 1-2.6.8-2.3-6.2 6-10.9 8.9-14.4 10.5-5.8 2.6-13 2.6-14.5-4.1-.1-.4-.1-.8-.2-1.2-11.8 9.2-24.3 11.7-20-8.1-4.6 8.2-12.6 14.9-22.4 14.9-4.1 0-7.1-1.4-8.6-5.1-2.3-5.5 1.3-14.9 4.6-23.8 1.7-4.5 4-9.9 7.1-16.2 1.6-3.4 4.2-5.4 7.6-4.5.6.2 1.1.4 1.6.7 2.6 1.8 1.6 4.5.3 7.2-3.8 7.5-7.1 13-9.3 20.8-.9 3.3-2 9 1.5 9 2.4 0 4.7-.8 6.9-2.4 4.6-3.4 8.3-8.5 11.1-13.5 2-3.6 4.4-8.3 5.6-12.3.5-1.7 1.1-3.3 1.8-4.8 1.1-2.5 2.6-5.1 5.2-5.1 1.3 0 2.4.5 3.2 1.5 1.7 2.2 1.3 4.5.4 6.9-2 5.6-4.7 10.6-6.9 16.7-1.3 3.5-2.7 8-2.7 11.7 0 3.4 3.7 2.6 6.8 1.2 2.4-1.1 4.8-2.8 6.8-4.5 1.2-4.9.9-3.8 26.4-68.2 1.3-3.3 3.7-4.7 6.1-4.7 1.2 0 2.2.4 3.2 1.1 1.7 1.3 1.7 4.1 1 6.2-.7 1.9-.6 1.3-4.5 10.5-5.2 12.1-8.6 20.8-13.2 31.9-1.9 4.6-7.7 18.9-8.7 22.3-.6 2.2-1.3 5.8 1 5.8 5.4 0 19.3-13.1 23.1-17 .2-.3.5-.4.9-.6.6-1.9 1.2-3.7 1.7-5.5 1.4-3.8 2.7-8.2 5.3-11.3.8-1 1.7-1.6 2.7-1.6 2.8 0 4.2 1.2 4.2 4 0 1.1-.7 5.1-1.1 6.2 1.4-1.5 2.9-3 4.5-4.5 15-13.9 25.7-6.8 25.7.2 0 7.4-8.9 17.7-13.8 23.4-1.6 1.9-4.9 5.4-5 6.4 0 1.3.9 1.8 2.2 1.8 2 0 6.4-3.5 8-4.7 5-3.9 11.8-9.9 16.6-14.1l14.8-136.8c-30.5 17.1-197.6 17.2-228.3.2zm229.7-8.5c0 21-231.2 21-231.2 0 0-8.8 51.8-15.9 115.6-15.9 9 0 17.8.1 26.3.4l12.6-48.7L228.1.6c1.4-1.4 5.8-.2 9.9 3.5s6.6 7.9 5.3 9.3l-.1.1L185.9 74l-10 40.7c39.9 2.6 67.6 8.1 67.6 14.6zm-69.4 4.6c0-.8-.9-1.5-2.5-2.1l-.2.8c0 1.3-5 2.4-11.1 2.4s-11.1-1.1-11.1-2.4c0-.1 0-.2.1-.3l.2-.7c-1.8.6-3 1.4-3 2.3 0 2.1 6.2 3.7 13.7 3.7 7.7.1 13.9-1.6 13.9-3.7z"></path></svg><!-- <span class="fa-brands fa-gulp ms-1 me-1 fa-lg"></span> Font Awesome fontawesome.com --></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Gulp</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="documentation/design-file.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-figma"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Design file</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="changelog.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-merge"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Changelog</span></span></div>
            </a></div><!-- parent pages-->
            <div class="nav-item-wrapper"><a class="nav-link label-1" href="showcase.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center"><span class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Showcase</span></span></div>
            </a></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-vertical-footer"><button class="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center"><span class="uil uil-left-arrow-to-left fs-8"></span><span class="uil uil-arrow-from-right fs-8"></span><span class="navbar-vertical-footer-text ms-2">Collapsed View</span></button></div>
  </nav>

</template>

<script setup>

import { reactive } from 'vue';
import SitebarNavItem from './SitebarNavItem.vue';

let items = reactive( [
  {label: 'Stats', to: {path: '/dashboard/stat'}, icon: 'bi bi-bar-chart', header: 'GLOBAL'},
  {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill'},
  {label: 'Settings sub', icon: 'bi bi-gear-fill', items: [
    {label: 'Stats', to: {path: '/dashboard/stat'}, icon: 'bi bi-bar-chart'},
    {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill'},
  ]}
]);

const onOpenNav = (event) => {
  let li = event.target.closest('li');
  let key = 1 * li.dataset.id;
  items[key].active =  items[key].active ? false : true;

};

</script>