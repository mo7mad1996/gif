export const state = () => ({
  sort: false,
  like_list: []
})

export const getters = {
  sort: state => state.sort,
  like_list: state => state.like_list
}

export const mutations = {
  updata_sort: state => state.sort = !state.sort,
  updata_like_list: (state, list) => {

    state.like_list = list
    setCookie('favourite', JSON.stringify(list))
  },
  get_old_favourite: state => state.like_list = JSON.parse(getCookie('favourite')) || []
}

export const actions = {
  make_like({
    commit,
    state
  }, obj) {



    if (obj.like) {
      if (!state.like_list.length) {
        commit('get_old_favourite')
      }
      commit('updata_like_list', [...state.like_list, obj.id])
    } else {
      let newData = Array.from(state.like_list)
      newData.splice(newData.indexOf(obj.id), 1)
      commit('updata_like_list', newData)
    }
  },


}

function setCookie(name, value) {
  if (process.client) {
    document.cookie = name + "=" + value + ";path=/";
  }
}

function getCookie(name) {
  if (process.client) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
