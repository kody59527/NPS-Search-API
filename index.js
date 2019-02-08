'use strict';

function getParks(finalInput, options) {
  fetch(finalInput, options)
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson)
      if (responseJson.message === 'Not Found') {
        $('.results-list').empty();
        $('.errorMessage').replaceWith(`<p class='errorMessage'>${responseJson.message}. Please try again.</p>`);
        $('.results-title').addClass('hidden');
        $('.results').removeClass('hidden');
      } else {
        $('.errorMessage').addClass('hidden');
        displayResults(responseJson);
      }
    })
    .catch(error => alert('Something went wrong. Please try again later.'));
}

function displayResults(responseJson) {
  $('.results-list').empty();
  $('.results-title').removeClass('hidden');
  for (let i = responseJson.start; i < (responseJson.limit + 1); i++) {
    $('.results-list').append(`<h3>${responseJson.data[i].fullName}</h3> 
    <p>${responseJson.data[i].description}</p> 
    <a href="${responseJson.data[i].url}">More Infomation</a></p>`);
  }
  $('.results').removeClass('hidden');
}

function watchForm(finalInput) {
  $('form').submit(event => {
    event.preventDefault();
    addStates();
  });
}

function formURL(finalStates) {
  let maxResults = $('#maxResults').val();
  const apiKey = 'U4N1OSnFxeDl8IxdPwpTktal1Kqq6lDhsq8l7uCs';
  let finalInput = `https://api.nps.gov/api/v1/parks?stateCode=${finalStates}&limit=${maxResults}&api_key=${apiKey}`; 
  getParks(finalInput);
}

function addStates() {
  let stateInput = $('#stateInput').val();
  let stateInputTwo = $('#stateInputTwo').val();
  console.log(typeof stateInputTwo)
  let finalStates = ' '; 
  if (stateInputTwo === '') {
    console.log('Only one state')
    finalStates = stateInput;
  } else {
    finalStates = stateInput + '&statecode=' + stateInputTwo;
    console.log(finalStates);
  }
  formURL(finalStates);
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});