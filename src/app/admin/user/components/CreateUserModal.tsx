import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from "@ant-design/pro-components";
import { message, Select, UploadProps } from "antd";
import React, { useState } from "react";
import { uploadFileUsingPost } from "@/api/fileController";
import { FileUploadBiz } from "@/constants/enums/FileUploadBizEnum";
import { userRole, UserRoleEnum } from "@/constants/enums/UserRoleEnum";
import { addUserUsingPost } from "@/api/userController";

interface Props {
  onCancel: () => void;
  onSubmit: (values: API.UserAddRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.UserAddRequest) => {
  const hide = message.loading("正在添加");
  try {
    const res = await addUserUsingPost({
      ...fields,
    });
    if (res.data?.code === 0 && res.data?.data) {
      message.success("添加成功");
      return true;
    } else {
      message.error(`添加失败${res.data?.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  } finally {
    hide();
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateUserModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 用户头像
  const [userAvatar, setUserAvatar] = useState<any>();
  const [form] = ProForm.useForm<API.UserAddRequest>();
  /**
   * 用户更新头像
   */
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFileUsingPost(
          {
            biz: FileUploadBiz.USER_AVATAR,
          },
          {
            file: file,
          },
          file,
        );
        if (res.data) {
          onSuccess(res.data);
          setUserAvatar(res.data);
        } else {
          // @ts-ignore
          onError(new Error(res.data?.message));
          // @ts-ignore
          message.error(`文件上传失败${res.data.message}`);
        }
      } catch (error: any) {
        onError(error);
        message.error("文件上传失败", error.message);
      }
    },
    onRemove() {
      setUserAvatar(undefined);
    },
  };

  return (
    <ModalForm
      title={"新建用户"}
      open={visible}
      form={form}
      onFinish={async (values: API.UserAddRequest) => {
        const success = await handleAdd({
          ...values,
          userAvatar: userAvatar,
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: "新建用户",
          resetText: "取消",
        },
      }}
    >
      <ProFormText name={"userAccount"} label={"账号"} />
      <ProFormText name={"userName"} label={"用户名"} />
      <ProFormTextArea name={"userProfile"} label={"简介"} />
      <ProFormText name={"userPhone"} label={"电话"} />
      <ProFormText name={"userEmail"} label={"邮箱"} />
      <ProFormUploadDragger
        title={"上传头像"}
        label={"头像"}
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="pic"
      />
      <ProFormSelect name={"userRole"} label={"权限"} valueEnum={userRole}>
        <Select>
          <Select.Option value={UserRoleEnum.ADMIN}>
            {userRole[UserRoleEnum.ADMIN].text}
          </Select.Option>
          <Select.Option value={UserRoleEnum.USER}>
            {userRole[UserRoleEnum.USER].text}
          </Select.Option>
          <Select.Option value={UserRoleEnum.BAN}>
            {userRole[UserRoleEnum.BAN].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
    </ModalForm>
  );
};
export default CreateUserModal;
