import { defineComponent,type PropType } from 'vue'
import { NButton, NButtonGroup, NIcon, NTooltip } from 'naive-ui'
import {
  Code,
  Image,
  Text,
  Warning,
  Information,
  Link,
  List,
} from '@vicons/ionicons5'

export interface BlogWriteTitleProps {
  onInsertCode?: () => void
  onInsertImage?: () => void
  onInsertText?: () => void
  onInsertWarning?: () => void
  onInsertInfo?: () => void
  onInsertLink?: () => void
  onInsertList?: () => void
}

export default defineComponent({
  name: 'blogwritetitle',
  props: {
    onInsertCode: {
      type: Function as PropType<() => void>,
      required: false
    },
    onInsertImage: {
      type: Function as PropType<() => void>,
      required: false
    },
    onInsertText: {
      type: Function as PropType<() => void>,
      required: false
    },
    onInsertWarning: {
      type: Function as PropType<() => void>,
      required: false
    },
    onInsertInfo: {
      type: Function as PropType<() => void>,
      required: false
    },
    onInsertLink: {
      type: Function as PropType<() => void>,
      required: false
    },
    onInsertList: {
      type: Function as PropType<() => void>,
      required: false
    }
  },
  setup(props) {
    return () => (
      <div class="blog-write-title">
        <NButtonGroup>
          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertCode?.()}>
                  <NIcon size={20} component={Code} />
                </NButton>
              ),
              default: () => '插入代码块'
            }}
          </NTooltip>

          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertImage?.()}>
                  <NIcon size={20} component={Image} />
                </NButton>
              ),
              default: () => '插入图片'
            }}
          </NTooltip>

          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertText?.()}>
                  <NIcon size={20} component={Text} />
                </NButton>
              ),
              default: () => '插入文本'
            }}
          </NTooltip>

          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertWarning?.()}>
                  <NIcon size={20} component={Warning} />
                </NButton>
              ),
              default: () => '插入警告框'
            }}
          </NTooltip>

          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertInfo?.()}>
                  <NIcon size={20} component={Information} />
                </NButton>
              ),
              default: () => '插入信息框'
            }}
          </NTooltip>

          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertLink?.()}>
                  <NIcon size={20} component={Link} />
                </NButton>
              ),
              default: () => '插入链接'
            }}
          </NTooltip>

          <NTooltip>
            {{
              trigger: () => (
                <NButton quaternary onClick={() => props.onInsertList?.()}>
                  <NIcon size={20} component={List} />
                </NButton>
              ),
              default: () => '插入列表'
            }}
          </NTooltip>
        </NButtonGroup>
      </div>
    )
  }
})
