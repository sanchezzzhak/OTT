<script setup>

</script>

<template>
  <a class="nav-link" href="#" style="min-width: 2.25rem" role="button" data-bs-toggle="dropdown"
     aria-haspopup="true" aria-expanded="false" data-bs-auto-close="outside"><span class="d-block"
                                                                                   style="height:20px;width:20px;"><svg
    xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="feather feather-bell" style="height:20px;width:20px;"><path
    d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path
    d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></span></a>
  <div
    class="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border navbar-dropdown-caret"
    id="navbarDropdownNotfication" aria-labelledby="navbarDropdownNotfication">

    <div class="card position-relative border-0">
      <div class="card-header p-2">
        <div class="d-flex justify-content-between">
          <h5 class="text-body-emphasis mb-0">Notifications</h5>
          <button class="btn btn-link p-0 fs-9 fw-normal" type="button">Mark all as read</button>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="scrollbar-overlay" style="height: 27rem;" data-simplebar="init">
          <div class="simplebar-wrapper" style="margin: 0px;">
            <div class="simplebar-height-auto-observer-wrapper">
              <div class="simplebar-height-auto-observer"></div>
            </div>
            <div class="simplebar-mask">
              <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                <div class="simplebar-content-wrapper" tabindex="0" role="region"
                     aria-label="scrollable content" style="height: auto; overflow: hidden;">
                  <div class="simplebar-content" style="padding: 0px;">
                    <div class="px-2 px-sm-3 py-3 notification-card position-relative read border-bottom">
                      <div class="d-flex align-items-center justify-content-between position-relative">
                        <div class="d-flex">
                          <div class="avatar avatar-m status-online me-3"><img class="rounded-circle"
                                                                               src="#assets/img/team/40x40/30.webp"
                                                                               alt=""></div>
                          <div class="flex-1 me-sm-3">
                            <h4 class="fs-9 text-body-emphasis">Jessie Samson</h4>
                            <p class="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal"><span class="me-1 fs-10">💬</span>Mentioned
                              you in a comment.<span
                                class="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10">10m</span></p>
                            <p class="text-body-secondary fs-9 mb-0">
                              <svg class="svg-inline--fa fa-clock me-1" aria-hidden="true" focusable="false"
                                   data-prefix="fas" data-icon="clock" role="img"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                              </svg>
                              <!-- <span class="me-1 fas fa-clock"></span> Font Awesome fontawesome.com --><span
                              class="fw-bold">10:41 AM </span>August 7,2021
                            </p>
                          </div>
                        </div>
                        <div class="dropdown notification-dropdown">
                          <button class="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none"
                                  type="button" data-bs-toggle="dropdown" data-boundary="window"
                                  aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                            <svg class="svg-inline--fa fa-ellipsis fs-10 text-body" aria-hidden="true"
                                 focusable="false" data-prefix="fas" data-icon="ellipsis" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                            </svg>
                            <!-- <span class="fas fa-ellipsis-h fs-10 text-body"></span> Font Awesome fontawesome.com -->
                          </button>
                          <div class="dropdown-menu py-2"><a class="dropdown-item" href="#!">Mark as unread</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-2 px-sm-3 py-3 notification-card position-relative unread border-bottom">
                      <div class="d-flex align-items-center justify-content-between position-relative">
                        <div class="d-flex">
                          <div class="avatar avatar-m status-online me-3">
                            <div class="avatar-name rounded-circle"><span>J</span></div>
                          </div>
                          <div class="flex-1 me-sm-3">
                            <h4 class="fs-9 text-body-emphasis">Jane Foster</h4>
                            <p class="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal"><span class="me-1 fs-10">📅</span>Created
                              an event.<span
                                class="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10">20m</span></p>
                            <p class="text-body-secondary fs-9 mb-0">
                              <svg class="svg-inline--fa fa-clock me-1" aria-hidden="true" focusable="false"
                                   data-prefix="fas" data-icon="clock" role="img"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                              </svg>
                              <!-- <span class="me-1 fas fa-clock"></span> Font Awesome fontawesome.com --><span
                              class="fw-bold">10:20 AM </span>August 7,2021
                            </p>
                          </div>
                        </div>
                        <div class="dropdown notification-dropdown">
                          <button class="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none"
                                  type="button" data-bs-toggle="dropdown" data-boundary="window"
                                  aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                            <svg class="svg-inline--fa fa-ellipsis fs-10 text-body" aria-hidden="true"
                                 focusable="false" data-prefix="fas" data-icon="ellipsis" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                            </svg>
                            <!-- <span class="fas fa-ellipsis-h fs-10 text-body"></span> Font Awesome fontawesome.com -->
                          </button>
                          <div class="dropdown-menu py-2"><a class="dropdown-item" href="#!">Mark as unread</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-2 px-sm-3 py-3 notification-card position-relative unread border-bottom">
                      <div class="d-flex align-items-center justify-content-between position-relative">
                        <div class="d-flex">
                          <div class="avatar avatar-m status-online me-3"><img
                            class="rounded-circle avatar-placeholder" src="#assets/img/team/40x40/avatar.webp"
                            alt=""></div>
                          <div class="flex-1 me-sm-3">
                            <h4 class="fs-9 text-body-emphasis">Jessie Samson</h4>
                            <p class="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal"><span class="me-1 fs-10">👍</span>Liked
                              your comment.<span
                                class="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10">1h</span></p>
                            <p class="text-body-secondary fs-9 mb-0">
                              <svg class="svg-inline--fa fa-clock me-1" aria-hidden="true" focusable="false"
                                   data-prefix="fas" data-icon="clock" role="img"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                              </svg>
                              <!-- <span class="me-1 fas fa-clock"></span> Font Awesome fontawesome.com --><span
                              class="fw-bold">9:30 AM </span>August 7,2021
                            </p>
                          </div>
                        </div>
                        <div class="dropdown notification-dropdown">
                          <button class="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none"
                                  type="button" data-bs-toggle="dropdown" data-boundary="window"
                                  aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                            <svg class="svg-inline--fa fa-ellipsis fs-10 text-body" aria-hidden="true"
                                 focusable="false" data-prefix="fas" data-icon="ellipsis" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                            </svg>
                            <!-- <span class="fas fa-ellipsis-h fs-10 text-body"></span> Font Awesome fontawesome.com -->
                          </button>
                          <div class="dropdown-menu py-2"><a class="dropdown-item" href="#!">Mark as unread</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-2 px-sm-3 py-3 notification-card position-relative unread border-bottom">
                      <div class="d-flex align-items-center justify-content-between position-relative">
                        <div class="d-flex">
                          <div class="avatar avatar-m status-online me-3"><img class="rounded-circle"
                                                                               src="#assets/img/team/40x40/57.webp"
                                                                               alt=""></div>
                          <div class="flex-1 me-sm-3">
                            <h4 class="fs-9 text-body-emphasis">Kiera Anderson</h4>
                            <p class="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal"><span class="me-1 fs-10">💬</span>Mentioned
                              you in a comment.<span
                                class="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10"></span></p>
                            <p class="text-body-secondary fs-9 mb-0">
                              <svg class="svg-inline--fa fa-clock me-1" aria-hidden="true" focusable="false"
                                   data-prefix="fas" data-icon="clock" role="img"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                              </svg>
                              <!-- <span class="me-1 fas fa-clock"></span> Font Awesome fontawesome.com --><span
                              class="fw-bold">9:11 AM </span>August 7,2021
                            </p>
                          </div>
                        </div>
                        <div class="dropdown notification-dropdown">
                          <button class="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none"
                                  type="button" data-bs-toggle="dropdown" data-boundary="window"
                                  aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                            <svg class="svg-inline--fa fa-ellipsis fs-10 text-body" aria-hidden="true"
                                 focusable="false" data-prefix="fas" data-icon="ellipsis" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                            </svg>
                            <!-- <span class="fas fa-ellipsis-h fs-10 text-body"></span> Font Awesome fontawesome.com -->
                          </button>
                          <div class="dropdown-menu py-2"><a class="dropdown-item" href="#!">Mark as unread</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-2 px-sm-3 py-3 notification-card position-relative unread border-bottom">
                      <div class="d-flex align-items-center justify-content-between position-relative">
                        <div class="d-flex">
                          <div class="avatar avatar-m status-online me-3"><img class="rounded-circle"
                                                                               src="#assets/img/team/40x40/59.webp"
                                                                               alt=""></div>
                          <div class="flex-1 me-sm-3">
                            <h4 class="fs-9 text-body-emphasis">Herman Carter</h4>
                            <p class="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal"><span class="me-1 fs-10">👤</span>Tagged
                              you in a comment.<span
                                class="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10"></span></p>
                            <p class="text-body-secondary fs-9 mb-0">
                              <svg class="svg-inline--fa fa-clock me-1" aria-hidden="true" focusable="false"
                                   data-prefix="fas" data-icon="clock" role="img"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                              </svg>
                              <!-- <span class="me-1 fas fa-clock"></span> Font Awesome fontawesome.com --><span
                              class="fw-bold">10:58 PM </span>August 7,2021
                            </p>
                          </div>
                        </div>
                        <div class="dropdown notification-dropdown">
                          <button class="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none"
                                  type="button" data-bs-toggle="dropdown" data-boundary="window"
                                  aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                            <svg class="svg-inline--fa fa-ellipsis fs-10 text-body" aria-hidden="true"
                                 focusable="false" data-prefix="fas" data-icon="ellipsis" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                            </svg>
                            <!-- <span class="fas fa-ellipsis-h fs-10 text-body"></span> Font Awesome fontawesome.com -->
                          </button>
                          <div class="dropdown-menu py-2"><a class="dropdown-item" href="#!">Mark as unread</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-2 px-sm-3 py-3 notification-card position-relative read ">
                      <div class="d-flex align-items-center justify-content-between position-relative">
                        <div class="d-flex">
                          <div class="avatar avatar-m status-online me-3"><img class="rounded-circle"
                                                                               src="#assets/img/team/40x40/58.webp"
                                                                               alt=""></div>
                          <div class="flex-1 me-sm-3">
                            <h4 class="fs-9 text-body-emphasis">Benjamin Button</h4>
                            <p class="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal"><span class="me-1 fs-10">👍</span>Liked
                              your comment.<span
                                class="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10"></span></p>
                            <p class="text-body-secondary fs-9 mb-0">
                              <svg class="svg-inline--fa fa-clock me-1" aria-hidden="true" focusable="false"
                                   data-prefix="fas" data-icon="clock" role="img"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                              </svg>
                              <!-- <span class="me-1 fas fa-clock"></span> Font Awesome fontawesome.com --><span
                              class="fw-bold">10:18 AM </span>August 7,2021
                            </p>
                          </div>
                        </div>
                        <div class="dropdown notification-dropdown">
                          <button class="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none"
                                  type="button" data-bs-toggle="dropdown" data-boundary="window"
                                  aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                            <svg class="svg-inline--fa fa-ellipsis fs-10 text-body" aria-hidden="true"
                                 focusable="false" data-prefix="fas" data-icon="ellipsis" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                            </svg>
                            <!-- <span class="fas fa-ellipsis-h fs-10 text-body"></span> Font Awesome fontawesome.com -->
                          </button>
                          <div class="dropdown-menu py-2"><a class="dropdown-item" href="#!">Mark as unread</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="simplebar-placeholder" style="width: 0px; height: 0px;"></div>
          </div>
          <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
            <div class="simplebar-scrollbar" style="width: 0px; display: none;"></div>
          </div>
          <div class="simplebar-track simplebar-vertical" style="visibility: hidden;">
            <div class="simplebar-scrollbar" style="height: 0px; display: none;"></div>
          </div>
        </div>
      </div>
      <div class="card-footer p-0 border-top border-translucent border-0">
        <div class="my-2 text-center fw-bold fs-10 text-body-tertiary text-opactity-85"><a class="fw-bolder"
                                                                                           href="pages/notifications.html">Notification
          history</a></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>