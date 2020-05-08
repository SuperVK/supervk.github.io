attribute vec2 a_position;

attribute vec2 a_translation;

attribute vec4 a_color

varying vec4 v_color

void main() {
    vec2 position = a_position + a_translation;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   v_color = a_color
}