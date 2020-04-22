<template>
  <div class="tabTable">
    <div class="yaml-editor">
      <textarea ref="textarea"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/yaml-lint';

//from https://github.com/Codecademy/stuff.js/blob/master/dist/example/codemirror/mode/yaml/index.html
CodeMirror.defineMode("yaml", function() {

  var cons = ['true', 'false', 'on', 'off', 'yes', 'no'];
  var keywordRegex = new RegExp("\\b(("+cons.join(")|(")+"))$", 'i');

  return {
    token: function(stream, state) {
      var ch = stream.peek();
      var esc = state.escaped;
      state.escaped = false;
      /* comments */
      if (ch == "#" && (stream.pos == 0 || /\s/.test(stream.string.charAt(stream.pos - 1)))) {
        stream.skipToEnd();
        return "comment";
      }

      if (stream.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/))
        return "string";

      if (state.literal && stream.indentation() > state.keyCol) {
        stream.skipToEnd(); return "string";
      } else if (state.literal) { state.literal = false; }
      if (stream.sol()) {
        state.keyCol = 0;
        state.pair = false;
        state.pairStart = false;
        /* document start */
        if(stream.match(/---/)) { return "def"; }
        /* document end */
        if (stream.match(/\.\.\./)) { return "def"; }
        /* array list item */
        if (stream.match(/\s*-\s+/)) { return 'meta'; }
      }
      /* inline pairs/lists */
      if (stream.match(/^(\{|\}|\[|\])/)) {
        if (ch == '{')
          state.inlinePairs++;
        else if (ch == '}')
          state.inlinePairs--;
        else if (ch == '[')
          state.inlineList++;
        else
          state.inlineList--;
        return 'meta';
      }

      /* list seperator */
      if (state.inlineList > 0 && !esc && ch == ',') {
        stream.next();
        return 'meta';
      }
      /* pairs seperator */
      if (state.inlinePairs > 0 && !esc && ch == ',') {
        state.keyCol = 0;
        state.pair = false;
        state.pairStart = false;
        stream.next();
        return 'meta';
      }

      /* start of value of a pair */
      if (state.pairStart) {
        /* block literals */
        if (stream.match(/^\s*(\||\>)\s*/)) { state.literal = true; return 'meta'; };
        /* references */
        if (stream.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) { return 'variable-2'; }
        /* numbers */
        if (state.inlinePairs == 0 && stream.match(/^\s*-?[0-9\.\,]+\s?$/)) { return 'number'; }
        if (state.inlinePairs > 0 && stream.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/)) { return 'number'; }
        /* keywords */
        if (stream.match(keywordRegex)) { return 'keyword'; }
      }

      /* pairs (associative arrays) -> key */
      if (!state.pair && stream.match(/^\s*(?:[,\[\]{}&*!|>'"%@`][^\s'":]|[^,\[\]{}#&*!|>'"%@`])[^#]*?(?=\s*:($|\s))/)) {
        state.pair = true;
        state.keyCol = stream.indentation();
        return "atom";
      }
      if (state.pair && stream.match(/^:\s*/)) { state.pairStart = true; return 'meta'; }

      /* nothing found, continue */
      state.pairStart = false;
      state.escaped = (ch == '\\');
      stream.next();
      return null;
    },
    startState: function() {
      return {
        pair: false,
        pairStart: false,
        keyCol: 0,
        inlinePairs: 0,
        inlineList: 0,
        literal: false,
        escaped: false
      };
    },
    lineComment: "#",
    fold: "indent"
  };
});

CodeMirror.defineMIME("text/x-yaml", "yaml");
CodeMirror.defineMIME("text/yaml", "yaml");

import { mapState } from 'vuex'

export default {
  name: 'TabTemplate',
  data() {
    return {
      templateEditor: false,
    };
  },
  watch: {
    template(newVal) {
      const editorValue = this.templateEditor.getValue();
      if (newVal !== editorValue) {
        this.templateEditor.setValue(newVal);
      }
    },
  },
  mounted() {
    this.templateEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      indentUnit: 2,
      mode: 'text/yaml',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      viewportMargin: Infinity
    });
    this.templateEditor.setSize(null, 705);
    this.templateEditor.setValue(this.template);
    this.templateEditor.on('change', (template) => {
      this.$store.commit('cloudformation/updateTemplate', template.getValue())
    });

  },
  computed: {
    ...mapState({
      template: state => state.cloudformation.template
    }),
    template: {
      get() {
        return this.$store.state.cloudformation.template
      },
      set(value) {
        this.$store.commit('cloudformation/updateTemplate', value)
      }
    }
  }
}
</script>

<style>
</style>